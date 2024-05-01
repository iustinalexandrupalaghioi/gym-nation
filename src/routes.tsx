import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NewEditBlog from "./pages/NewEditBlog";
import ErrorPage from "./pages/ErrorPage";
import BlogPostsPage from "./pages/BlogPostsPage";
import BlogArticlePage from "./pages/BlogArticlePage";
import Services from "./pages/Services";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/blog",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <BlogPostsPage />,
      },
      {
        path: "/blog/:slug",
        element: <BlogArticlePage />,
      },
      { path: "/blog/new", element: <NewEditBlog /> },
    ],
  },
  {
    path: "/workouts",
    element: <Layout />,
    children: [{ index: true, element: <Services /> }],
  },
]);
export default router;
