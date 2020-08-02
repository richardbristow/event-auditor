import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

const Error = ({ error }) => (
  <Alert style={{ marginBottom: '16px' }} severity="error">
    <AlertTitle>Error</AlertTitle>
    <strong>{error.name}</strong> - {error.message}
  </Alert>
);

export default Error;
