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
import Account from "./pages/Client/Account";
import AdminLayout from "./pages/Admin/AdminLayout";
import Home from "./pages/Admin/Home";
import CustomersPage from "./pages/Admin/CustomersPage";
import RegisterPage from "./pages/RegisterPage";
import CategoriesPage from "./pages/Admin/CategoriesPage";
import GroupMusclePage from "./pages/Admin/GroupMusclePage";
import { BlogArticlesPage } from "./pages/Admin/BlogArticlesPage";
import AdminWorkoutsPage from "./pages/Admin/AdminWorkoutsPage";
import WorkoutSectionsPage from "./pages/Admin/WorkoutSectionsPage";
import WorkoutExercisesPage from "./pages/Admin/WorkoutExercisesPage";
import UpdateWorkout from "./pages/Admin/UpdateWorkout";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/admin/blog", element: <BlogArticlesPage /> },
      { path: "/admin/blog/new", element: <NewBlogPage /> },
      { path: "/admin/blog/categories", element: <CategoriesPage /> },
      { path: "/admin/workouts", element: <AdminWorkoutsPage /> },
      { path: "/admin/workouts/:titleSlug/edit", element: <UpdateWorkout /> },

      {
        path: "/admin/workouts/:titleSlug/sections",
        element: <WorkoutSectionsPage />,
      },
      {
        path: "/admin/workouts/:titleSlug/sections/:sectionId",
        element: <WorkoutExercisesPage />,
      },

      { path: "/admin/workouts/new", element: <NewWorkoutPage /> },
      { path: "/admin/workouts/muscles", element: <GroupMusclePage /> },
      { path: "/admin/customers", element: <CustomersPage /> },
    ],
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
    ],
  },
  {
    path: "/workouts",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <WorkoutsPage /> }],
  },
  { path: "/workouts/:slug", element: <SingleWorkoutPage /> },
]);
export default router;
