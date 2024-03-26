import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SubHeader from "../components/SubHeader";

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
