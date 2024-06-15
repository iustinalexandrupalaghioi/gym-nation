import { Navigate } from "react-router-dom";
import DashboardBody from "../../components/dashboard/DashboardBody";
import Header from "../../components/dashboard/Header";
import useUserStatusStore from "../../stores/userStore";

const AdminLayout = () => {
  const isAdmin = useUserStatusStore((s) => s.userStatus.isAdmin);

  if (isAdmin) {
    return (
      <>
        <Header />
        <DashboardBody />
      </>
    );
  }
  return <Navigate to="/" />;
};

export default AdminLayout;
