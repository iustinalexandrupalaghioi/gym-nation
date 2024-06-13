import { Outlet } from "react-router-dom";
import NavLinks from "../../components/homepage/NavLinks/NavLinks";
import Footer from "../../components/partials/Footer/Footer";
import NavBar from "../../components/partials/Navbar/NavBar";

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
