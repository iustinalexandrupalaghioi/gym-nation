import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PrimeReactProvider } from "primereact/api";
import router from "./routes.tsx";
import "./assets/styles/_custom.scss";
import "bootstrap";
import "./index.css";
export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </PrimeReactProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
