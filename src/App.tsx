import { queryClient } from "@api/api";
import { GlobalStyle } from "@styles/GlobalStyle";
import React from "react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./Routes";

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <GlobalStyle />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
