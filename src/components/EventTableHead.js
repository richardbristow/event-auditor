import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';

const StyledTableHead = styled(TableHead)`
  background-color: #131313;
`;

const StyledTableCell = styled(TableCell)`
  width: 25%;
  vertical-align: text-top;
`;

const StyledColumnHeader = styled.div`
  padding-bottom: 16px;
`;

const EventTableHead = ({ headerGroups }) => (
  <StyledTableHead>
    {headerGroups.map((headerGroup) => (
      <TableRow {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <StyledTableCell
            {...column.getHeaderProps(column.getSortByToggleProps())}
          >
            <StyledColumnHeader>
              {column.render('Header')}
              <TableSortLabel
                active={column.canSort}
                direction={column.isSortedDesc ? 'desc' : 'asc'}
                hideSortIcon
              />
            </StyledColumnHeader>
            {column.canFilter && column.render('Filter')}
          </StyledTableCell>
        ))}
      </TableRow>
    ))}
  </StyledTableHead>
);

EventTableHead.propTypes = {
  headerGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EventTableHead;
