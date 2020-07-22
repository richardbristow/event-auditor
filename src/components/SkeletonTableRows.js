import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonTableRows = ({ numberOfRows = 5 }) => (
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

export default SkeletonTableRows;
