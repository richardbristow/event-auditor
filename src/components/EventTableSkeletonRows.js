import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow, Fade } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const EventTableSkeletonRows = ({ numberOfRows, isInitialLoad }) => (
  <>
    {[...Array(numberOfRows).keys()].map((rowNumber) => (
      <TableRow key={`skeletonRow-${rowNumber}`}>
        {[...Array(4).keys()].map((cellNumber) => (
          <TableCell key={`skeletonCell-${cellNumber}`}>
            <Fade
              in
              style={{
                transitionDelay: isInitialLoad ? '0ms' : '250ms',
              }}
            >
              <Skeleton animation="wave" />
            </Fade>
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

EventTableSkeletonRows.defaultProps = {
  numberOfRows: 5,
};

EventTableSkeletonRows.propTypes = {
  numberOfRows: PropTypes.number,
  isInitialLoad: PropTypes.bool.isRequired,
};

export default EventTableSkeletonRows;
