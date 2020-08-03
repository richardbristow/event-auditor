import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableFooter, TablePagination } from '@material-ui/core';
import EventTablePaginationActions from './EventTablePaginationActions';

const EventTableFooter = ({
  pageSize,
  pageIndex,
  handleChangePage,
  setPageSize,
  pageCount,
  canNextPage,
  canPreviousPage,
}) => (
  <TableFooter>
    <TableRow>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        count={-1}
        rowsPerPage={pageSize}
        page={pageIndex}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={(event) => {
          setPageSize(event.target.value);
        }}
        labelDisplayedRows={() => `Page ${pageIndex + 1} of ${pageCount}`}
        ActionsComponent={() => (
          <EventTablePaginationActions
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            pageCount={pageCount}
            onChangePage={handleChangePage}
            pageIndex={pageIndex}
          />
        )}
      />
    </TableRow>
  </TableFooter>
);

EventTableFooter.propTypes = {
  pageSize: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  canNextPage: PropTypes.bool.isRequired,
  canPreviousPage: PropTypes.bool.isRequired,
};

export default EventTableFooter;
