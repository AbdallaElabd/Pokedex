import { queryClient } from '@api/api';
import { RouterProvider } from '@tanstack/router';
import React from 'react';
import { QueryClientProvider } from 'react-query';

import { router } from './router';

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
