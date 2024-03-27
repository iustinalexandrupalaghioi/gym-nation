import { Navigate, Outlet } from "react-router-dom";

// if user is not loged in -> redirect to login
const PrivateRoutes = () => {
  const user = "ion";
  if (!user) return <Navigate to="/" />;
  return <Outlet />;
};

export default PrivateRoutes;
