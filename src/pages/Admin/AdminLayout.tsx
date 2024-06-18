import { Navigate } from "react-router-dom";
import DashboardBody from "../../components/dashboard/DashboardBody";
import Header from "../../components/dashboard/Header";
import useUserStatusStore from "../../stores/userStore";
import ToastAlert from "../../components/ToastAlert";

const AdminLayout = () => {
  const isAdmin = useUserStatusStore((s) => s.userStatus.isAdmin);

  if (isAdmin) {
    return (
      <>
        <Header />
        <ToastAlert />
        <DashboardBody />
      </>
    );
  }
  return <Navigate to="/" />;
};

export default AdminLayout;
