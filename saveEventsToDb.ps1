# Below two commands initialise/setup the database
# WARNING: Running the connect command will drop the named collection!
# Import-Module mdbc
# Connect-Mdbc . "eventsDb" "events" -NewCollection

# Below commands initilise the regkey with a date to begin collection from
# These commands should be run in the user context that the script will run in
# $regKey = "HKCU:\Software\eventAuditor\eventCollector"
# New-Item -Path $regKey -Force
# [datetime]$lastRunInitialise = "1977-01-01T00:00:00"
# New-ItemProperty -Path $regKey -Name "eventCollectorLastRun" -Value $lastRunInitialise -Force

# A registry key eventAuditorCollectorRW can also be created to store the password
# if R/W access to the database has been password protected. If not the relevant
# lines can be removed, and the connection string altered.

Import-Module mdbc

$regKey = "HKCU:\Software\eventAuditor\eventCollector"

$eventAuditorCollectorRWValue = Get-ItemProperty -Path $regKey -Name "eventAuditorCollectorRW" -ErrorAction SilentlyContinue | Select-Object -ExpandProperty eventAuditorCollectorRW

Connect-Mdbc -ConnectionString "mongodb://eventAuditorCollectorRW:$eventAuditorCollectorRWValue@localhost:27017" -DatabaseName "eventsDb" -CollectionName "events"

$lastRunValue = Get-ItemProperty -Path $regKey -Name "eventCollectorLastRun" -ErrorAction SilentlyContinue | Select-Object -ExpandProperty eventCollectorLastRun

$filter = @{
  StartTime = $lastRunValue
  LogName   = "Security"
  ID        = 4740, 4722, 4725
}

$eventArray = @()

$winEvents = Get-WinEvent -computerName ((Get-AdDomain).PDCEmulator) -FilterHashtable $filter -ErrorAction SilentlyContinue

if ($winEvents) {
  $winEvents |
  ForEach-Object {
    $winEvent = @{
      _id              = [MongoDB.Bson.ObjectId]::GenerateNewId()
      EventID          = $_.ID
      RecordID         = $_.RecordID
      TimeCreated      = $_.TimeCreated
      LogName          = $_.LogName
      LevelDisplayName = $_.LevelDisplayName
      ProviderName     = $_.ProviderName
      TaskDisplayName  = $_.TaskDisplayName
      AdditionalInfo   = @{ }
    }

    switch ($_) {
      # 4740 - account locked
      { $_.ID -eq 4740 } {
        $winEvent.eventShortDescription = "Account Locked"
        $winEvent.AdditionalInfo.LockedAccountName = $_.Properties[0].Value.toLower()
        $winEvent.AdditionalInfo.LockedSID = $_.Properties[2].Value.toString()
        $winEvent.AdditionalInfo.CallerComputerName = $_.Properties[1].Value.toLower()
        $winEvent.AdditionalInfo.Domain = $_.Properties[5].Value.toLower()
        $winEvent.targetObject = $_.Properties[0].Value.toLower()
        $winEvent.sourceObject = $_.Properties[1].Value.toLower()
      }
      # 4722 - account enabled
      { $_.ID -eq 4722 } {
        $winEvent.eventShortDescription = "Account Enabled"
        $winEvent.AdditionalInfo.InitiatorSID = $_.Properties[3].Value.toString()
        $winEvent.AdditionalInfo.InitiatorAccountName = $_.Properties[4].Value.toLower()
        $winEvent.AdditionalInfo.InitiatorDomain = $_.Properties[1].Value.toLower()
        $winEvent.AdditionalInfo.TargetSID = $_.Properties[2].Value.toString()
        $winEvent.AdditionalInfo.TargetAccountName = $_.Properties[0].Value.toLower()
        $winEvent.AdditionalInfo.TargetDomain = $_.Properties[5].Value.toLower()
        $winEvent.targetObject = $_.Properties[0].Value.toLower()
        $winEvent.sourceObject = $_.Properties[4].Value.toLower()
      }
      # 4725 - account disabled
      { $_.ID -eq 4725 } {
        $winEvent.eventShortDescription = "Account Disabled"
        $winEvent.AdditionalInfo.InitiatorSID = $_.Properties[3].Value.toString()
        $winEvent.AdditionalInfo.InitiatorAccountName = $_.Properties[4].Value.toLower()
        $winEvent.AdditionalInfo.InitiatorDomain = $_.Properties[1].Value.toLower()
        $winEvent.AdditionalInfo.TargetSID = $_.Properties[2].Value.toString()
        $winEvent.AdditionalInfo.TargetAccountName = $_.Properties[0].Value.toLower()
        $winEvent.AdditionalInfo.TargetDomain = $_.Properties[5].Value.toLower()
        $winEvent.targetObject = $_.Properties[0].Value.toLower()
        $winEvent.sourceObject = $_.Properties[4].Value.toLower()
      }
      Default { }
    }

    $eventArray += $winevent
    Clear-Variable winEvent
  }
}

try {
  $eventArray | Add-MdbcData
  New-ItemProperty -Path $regKey -Name "eventCollectorLastRun" -Value (Get-Date -Format s) -Force | Out-Null
  Clear-Variable eventArray, winEvent
}
catch {
  # write error to log if fails
}
