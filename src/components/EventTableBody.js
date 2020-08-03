import React from 'react';
import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@material-ui/core';
import EventTableSkeletonRows from './EventTableSkeletonRows';

const EventTableBody = ({
  getTableBodyProps,
  isLoading,
  pageSize,
  page,
  prepareRow,
}) => (
  <TableBody {...getTableBodyProps()}>
    {isLoading ? (
      <EventTableSkeletonRows numberOfRows={pageSize} />
    ) : (
      page.map((row) => {
        prepareRow(row);
        return (
          <TableRow hover tabIndex={-1} {...row.getRowProps()}>
            {row.cells.map((cell) => {
              return (
                <TableCell {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })
    )}
  </TableBody>
);

EventTableBody.propTypes = {
  getTableBodyProps: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pageSize: PropTypes.number.isRequired,
  page: PropTypes.arrayOf(PropTypes.object).isRequired,
  prepareRow: PropTypes.func.isRequired,
};

export default EventTableBody;
