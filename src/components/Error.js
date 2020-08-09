import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Alert, AlertTitle } from '@material-ui/lab';

const StyledAlert = styled(Alert)`
  margin-bottom: 16px;
`;

const Error = ({ error }) => (
  <StyledAlert severity="error">
    <AlertTitle>Error</AlertTitle>
    <strong>{error.name}</strong> - {error.message}
  </StyledAlert>
);

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default Error;
