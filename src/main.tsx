import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PrimeReactProvider } from "primereact/api";
import router from "./routes.tsx";
import "./assets/styles/_custom.scss";
import "bootstrap";
import "./index.css";
import useUserStatusStore from "./stores/userStore.ts";
import { auth } from "./firebase-config.ts";
import { User, onAuthStateChanged } from "firebase/auth";
import getUserRole from "./utilities/getUserRole.ts";
import getUserStatus from "./utilities/getUserStatus.ts";
export const queryClient = new QueryClient();
const AppInitializer = ({ children }: { children: ReactNode }) => {
  const setStatus = useUserStatusStore((state) => state.setStatus);
  const setRole = useUserStatusStore((state) => state.setRole);

  // Check authentication state and fetch user status and role on page load
  useEffect(() => {
    const handleAuthStateChange = async (user: User | null) => {
      const newUserStatus = user ? await getUserStatus() : false;
      setStatus(newUserStatus);
      const newUserRole = user ? await getUserRole(user.uid) : false;
      setRole(newUserRole);
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

    // Cleanup subscription and event listener on unmount
    return () => unsubscribe();
  }, [auth]);

  return children;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <AppInitializer>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </AppInitializer>
      </PrimeReactProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
