import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/route.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./context/AppContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
