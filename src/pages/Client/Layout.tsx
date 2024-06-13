import { Outlet } from "react-router-dom";
import NavBar from "../../components/partials/Navbar/NavBar";

import Footer from "../../components/partials/Footer/Footer";
import NavLinks from "../../components/homepage/NavLinks/NavLinks";

const Layout = () => {
  return (
    <>
      <NavBar>
        <NavLinks />
      </NavBar>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
