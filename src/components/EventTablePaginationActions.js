import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from '@material-ui/icons';

const EventTablePaginationActions = ({
  canNextPage,
  canPreviousPage,
  pageCount,
  onChangePage,
  pageIndex,
}) => (
  <>
    <IconButton
      onClick={() => {
        onChangePage(0);
      }}
      disabled={!canPreviousPage}
    >
      <FirstPage />
    </IconButton>
    <IconButton
      onClick={() => {
        onChangePage(pageIndex - 1);
      }}
      disabled={!canPreviousPage}
    >
      <KeyboardArrowLeft />
    </IconButton>
    <IconButton
      onClick={() => {
        onChangePage(pageIndex + 1);
      }}
      disabled={!canNextPage}
    >
      <KeyboardArrowRight />
    </IconButton>
    <IconButton
      onClick={() => {
        onChangePage(pageCount - 1);
      }}
      disabled={!canNextPage}
    >
      <LastPage />
    </IconButton>
  </>
);

EventTablePaginationActions.propTypes = {
  canNextPage: PropTypes.bool.isRequired,
  canPreviousPage: PropTypes.bool.isRequired,
  pageCount: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  pageIndex: PropTypes.number.isRequired,
};

export default EventTablePaginationActions;
