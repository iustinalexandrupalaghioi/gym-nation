import { Outlet } from "react-router-dom";
import NavBar from "../components/partials/Navbar/NavBar";

import Cover from "../components/partials/Cover/Cover";
import Footer from "../components/partials/Footer";

const Layout = () => {
  return (
    <>
      <Cover>
        <NavBar />
      </Cover>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
