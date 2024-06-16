import { Outlet } from "react-router-dom";
import Footer from "../../components/partials/Footer/Footer";
import NavBar from "../../components/partials/Navbar/NavBar";

const Layout = () => {
  return (
    <>
      <NavBar styleClass="bg-dark shadow" />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
