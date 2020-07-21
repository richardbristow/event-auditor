const eventKeys = {
  4740: {
    name: 'Account Locked',
    getAdditionalInfo: (row) => ({
      target: `${row.AdditionalInfo.LockedAccountName}`,
      source: `${row.AdditionalInfo.CallerComputerName}`,
    }),
  },
  4722: {
    name: 'Account Enabled',
    getAdditionalInfo: (row) => ({
      target: `${row.AdditionalInfo.TargetAccountName}`,
      source: `${row.AdditionalInfo.InitiatorAccountName}`,
    }),
  },
  4725: {
    name: 'Account Disabled',
    getAdditionalInfo: (row) => ({
      target: `${row.AdditionalInfo.TargetAccountName}`,
      source: `${row.AdditionalInfo.InitiatorAccountName}`,
    }),
  },
};

export default eventKeys;
