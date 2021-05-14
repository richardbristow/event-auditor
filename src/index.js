import React from 'react';
import ReactDOM from 'react-dom';
import {
  createMuiTheme,
  ThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

ReactDOM.render(
  // Commented out StrictMode due to warnings created from page dropdown in the table.
  // See https://github.com/mui-org/material-ui/issues/18018 and https://github.com/mui-org/material-ui/issues/20012

  // <React.StrictMode>
  <StylesProvider injectFirst>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StylesProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
