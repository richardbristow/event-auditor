import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

const EventTableHead = ({ headerGroups }) => (
  <TableHead style={{ backgroundColor: '#131313' }}>
    {headerGroups.map((headerGroup) => (
      <TableRow {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <TableCell
            style={{ width: '25%', verticalAlign: 'text-top' }}
            {...column.getHeaderProps()}
          >
            <div style={{ paddingBottom: '16px' }}>
              {column.render('Header')}
            </div>
            {column.canFilter && column.render('Filter')}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableHead>
);

EventTableHead.propTypes = {
  headerGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EventTableHead;
