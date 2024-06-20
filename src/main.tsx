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
import getUserStatus from "./utilities/getUserStatus.ts";
import { auth } from "./firebase-config.ts";
import getUserRole from "./utilities/getUserRole.ts";
import useUserStatusStore from "./stores/userStore.ts";

export const queryClient = new QueryClient();
const setStatus = useUserStatusStore((s) => s.setStatus);
const setRole = useUserStatusStore((s) => s.setRole);
const newUserStatus = auth.currentUser ? await getUserStatus() : false;
setStatus(newUserStatus);

//check user role
const newUserRole = auth.currentUser
  ? getUserRole(auth.currentUser.uid)
  : false;
setRole(newUserRole);

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
