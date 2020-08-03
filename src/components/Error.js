import React from 'react';
import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@material-ui/lab';

const Error = ({ error }) => (
  <Alert style={{ marginBottom: '16px' }} severity="error">
    <AlertTitle>Error</AlertTitle>
    <strong>{error.name}</strong> - {error.message}
  </Alert>
);

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default Error;
