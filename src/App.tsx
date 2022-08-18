import { queryClient } from '@api/api';
import { GlobalStyle } from '@styles/GlobalStyle';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';
import { wrapHistory } from 'oaf-react-router';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

import { AppRoutes } from './Routes';

const history = createBrowserHistory();
wrapHistory(history, {
  shouldHandleAction: (previousLocation, nextLocation) =>
    previousLocation.pathname !== nextLocation.pathname,
});

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <HistoryRouter history={history}>
          <AppRoutes />
        </HistoryRouter>
        <GlobalStyle />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
