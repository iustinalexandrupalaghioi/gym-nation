import { createBrowserRouter } from "react-router-dom";

import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import MembersLayout from "./pages/MembersLayout";
import MembersHome from "./pages/MembersHome";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "blog", element: <Blog /> },
      { path: "contact", element: <Contact /> },
    ],
  },

  {
    path: "/members",
    element: <MembersLayout />,
    children: [{ path: "welcome", element: <MembersHome /> }],
  },
]);
export default router;
