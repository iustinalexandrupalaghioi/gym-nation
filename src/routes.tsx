import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Client/HomePage";
import LoginPage from "./pages/LoginPage";
import Layout from "./pages/Client/Layout";
import Account from "./pages/Account";
import AdminLayout from "./pages/Admin/AdminLayout";
import { BlogArticlesPage } from "./pages/Admin/Blog/BlogArticlesPage";
import CategoriesPage from "./pages/Admin/Blog/CategoriesPage";
import NewBlogPage from "./pages/Admin/Blog/NewBlogPage";
import CustomersPage from "./pages/Admin/CustomersPage";
import Home from "./pages/Admin/Home";
import AdminWorkoutsPage from "./pages/Admin/Workout/AdminWorkoutsPage";
import GroupMusclePage from "./pages/Admin/Workout/GroupMusclePage";
import NewWorkoutPage from "./pages/Admin/Workout/NewWorkoutPage";
import WorkoutExercisesPage from "./pages/Admin/Workout/WorkoutExercisesPage";
import WorkoutSectionsPage from "./pages/Admin/Workout/WorkoutSectionsPage";
import BlogArticlePage from "./pages/Client/Blog/BlogArticlePage";
import BlogPostsPage from "./pages/Client/Blog/BlogPostsPage";
import ErrorPage from "./pages/Client/ErrorPage";
import SingleWorkoutPage from "./pages/Client/Workout/SingleWorkoutPage";
import WorkoutsPage from "./pages/Client/Workout/WorkoutsPage";
import RegisterPage from "./pages/RegisterPage";
import UpdateWorkoutPage from "./pages/Admin/Workout/UpdateWorkoutPage";

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
      {
        path: "/admin/workouts/:titleSlug/edit",
        element: <UpdateWorkoutPage />,
      },

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
