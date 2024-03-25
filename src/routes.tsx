import { createBrowserRouter } from "react-router-dom";

import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Home from "./pages/Home";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/blog", element: <Blog /> },
  { path: "/contact", element: <Contact /> },
]);
export default router;
