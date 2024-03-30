import React from "react";
import ReactDOM from "react-dom/client";

import "./assets/styles/_custom.scss";
import "bootstrap";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
