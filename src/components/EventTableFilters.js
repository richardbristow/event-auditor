import React, { useState, useEffect } from 'react';
import { useAsyncDebounce } from 'react-table';
import { TextField, Select, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';

const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => {
  const [value, setValue] = useState(filterValue);
  const onFilterChange = useAsyncDebounce(() => {
    setFilter(value || undefined);
  }, 500);

  useEffect(() => {
    setValue(filterValue || '');
  }, [filterValue]);

  return (
    <TextField
      value={value || ''}
      onChange={(event) => {
        setValue(event.target.value);
        onFilterChange(event.target.value);
      }}
      type="search"
      placeholder="Filter..."
    />
  );
};

const SelectColumnFilter = ({
  column: { filterValue, setFilter },
  eventDescriptions,
}) => (
  <Select
    value={filterValue || 'All'}
    onChange={(event) => {
      setFilter(event.target.value !== 'All' ? event.target.value : undefined);
    }}
  >
    <MenuItem value="All">All</MenuItem>
    {eventDescriptions.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))}
  </Select>
);

DefaultColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func,
  }).isRequired,
};

SelectColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func,
  }).isRequired,
  eventDescriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export { DefaultColumnFilter, SelectColumnFilter };
