import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardBody = () => {
  const { pathname } = useLocation();

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar pathname={pathname} />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardBody;
