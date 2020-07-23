import React from 'react';
import { IconButton } from '@material-ui/core';
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from '@material-ui/icons';

const TablePaginationActions = ({
  canNextPage,
  canPreviousPage,
  pageCount,
  onChangePage,
  pageIndex,
}) => (
  <>
    <IconButton
      onClick={(event) => {
        onChangePage(event, 0);
      }}
      disabled={!canPreviousPage}
    >
      <FirstPage />
    </IconButton>
    <IconButton
      onClick={(event) => {
        onChangePage(event, pageIndex - 1);
      }}
      disabled={!canPreviousPage}
    >
      <KeyboardArrowLeft />
    </IconButton>
    <IconButton
      onClick={(event) => {
        onChangePage(event, pageIndex + 1);
      }}
      disabled={!canNextPage}
    >
      <KeyboardArrowRight />
    </IconButton>
    <IconButton
      onClick={(event) => {
        onChangePage(event, pageCount - 1);
      }}
      disabled={!canNextPage}
    >
      <LastPage />
    </IconButton>
  </>
);

export default TablePaginationActions;
