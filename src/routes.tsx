import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import BlogPostsOverview from "./components/blog/BlogPostsOverview";
import BlogArticle from "./components/blog/BlogArticle";
import BlogLayout from "./pages/BlogLayout";
import NewEditBlog from "./pages/NewEditBlog";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "blog",
        element: <BlogLayout />,
        children: [
          { index: true, element: <BlogPostsOverview /> },
          { path: "/blog/:id", element: <BlogArticle /> },
        ],
      },
      { path: "/blog/new", element: <NewEditBlog /> },
      { path: "services", element: <Home /> },
    ],
  },
]);
export default router;
