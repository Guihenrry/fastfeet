import React from 'react';
import {ThemeProvider} from 'styled-components';

import './config/ReactotronConfig';

import AuthProvider from '~/auth';
import theme from '~/styles/theme';
import Routes from '~/routes';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
