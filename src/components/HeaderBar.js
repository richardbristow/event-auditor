import React from 'react';
import { Button, Typography, AppBar, Toolbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Search as SearchIcon } from 'react-feather';

const StyledAppBar = styled(AppBar)`
  box-shadow: none;
  background-color: transparent;
`;

const StyledToolbar = styled(Toolbar)`
  padding: 0;
`;

const StyledTypography = styled(Typography)`
  padding-left: 12px;
  flex: 1;
`;

const HeaderBar = ({ filters, setAllFilters }) => (
  <StyledAppBar position="static">
    <StyledToolbar>
      <SearchIcon />
      <StyledTypography variant="h6">Event Auditor</StyledTypography>
      <Button disabled={!filters.length > 0} onClick={() => setAllFilters([])}>
        Reset Filters
      </Button>
    </StyledToolbar>
  </StyledAppBar>
);

HeaderBar.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  setAllFilters: PropTypes.func.isRequired,
};

export default HeaderBar;
