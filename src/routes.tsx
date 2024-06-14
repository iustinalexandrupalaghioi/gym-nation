import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Client/HomePage";
import LoginPage from "./pages/LoginPage";
import Layout from "./pages/Client/Layout";
import NewBlogPage from "./pages/Admin/NewBlogPage";
import NewWorkoutPage from "./pages/Admin/NewWorkoutPage";
import BlogArticlePage from "./pages/Client/BlogArticlePage";
import BlogPostsPage from "./pages/Client/BlogPostsPage";
import ErrorPage from "./pages/Client/ErrorPage";
import SingleWorkoutPage from "./pages/Client/SingleWorkoutPage";
import WorkoutsPage from "./pages/Client/WorkoutsPage";
import Account from "./pages/Account";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  {
    path: "/account",
    element: <Account />,
  },
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
