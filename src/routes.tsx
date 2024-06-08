import { createBrowserRouter } from "react-router-dom";

import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import BlogPostsPage from "./pages/BlogPostsPage";
import BlogArticlePage from "./pages/BlogArticlePage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NewBlogPage from "./pages/NewBlogPage";
import WorkoutsPage from "./pages/WorkoutsPage";
import NewWorkoutPage from "./pages/NewWorkoutPage";
import SingleWorkoutPage from "./pages/SingleWorkoutPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
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
      { path: "/blog/new", element: <NewBlogPage /> },
    ],
  },
  {
    path: "/workouts",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <WorkoutsPage /> },
      { path: "/workouts/new", element: <NewWorkoutPage /> },
    ],
  },
  { path: "/workouts/:slug", element: <SingleWorkoutPage /> },
]);
export default router;
