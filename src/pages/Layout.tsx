import { Outlet } from "react-router-dom";
import NavBar from "../components/partials/NavBar";
import SubHeader from "../components/partials/SubHeader";

const Layout = () => {
  return (
    <>
      <SubHeader>
        <NavBar />
      </SubHeader>
      <Outlet />
    </>
  );
};

export default Layout;
