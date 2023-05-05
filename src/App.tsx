import { queryClient } from '@api/api';
import { GlobalStyle } from '@styles/GlobalStyle';
import { RouterProvider } from '@tanstack/router';
import React from 'react';
import { QueryClientProvider } from 'react-query';

import { router } from './router';

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <GlobalStyle />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
