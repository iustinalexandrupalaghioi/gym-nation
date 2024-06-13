import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase-config";
const PrivateRoutes = () => {
  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
