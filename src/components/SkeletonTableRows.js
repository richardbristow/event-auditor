import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonTableRows = ({ numberOfRows }) => (
  <>
    {[...Array(numberOfRows).keys()].map((rowNumber) => (
      <TableRow key={`skeletonRow-${rowNumber}`}>
        {[...Array(4).keys()].map((cellNumber) => (
          <TableCell key={`skeletonCell-${cellNumber}`}>
            <Skeleton animation="wave" />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

SkeletonTableRows.defaultProps = {
  numberOfRows: 5,
};

SkeletonTableRows.propTypes = {
  numberOfRows: PropTypes.number,
};

export default SkeletonTableRows;
