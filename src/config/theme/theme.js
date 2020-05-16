import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    black: '#000000',
    white: '#ffffff',
    primary: '#fdb755',
    brownishGrey: '#636363',
    grayBase: '#93918f',
    gray: '#e6e6e6',
    linkColor: '#0087ff',
  },

  fonts: {
    primary: 'Montserrat',
    secondary: 'Bitter',
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

Theme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Theme;
