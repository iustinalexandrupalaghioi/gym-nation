import { createBrowserRouter } from "react-router-dom";

import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "blog", element: <Blog /> }],
  },
]);
export default router;
