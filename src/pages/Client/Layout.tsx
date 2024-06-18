import { Outlet } from "react-router-dom";
import Footer from "../../components/partials/Footer/Footer";
import NavBar from "../../components/partials/Navbar/NavBar";
import ToastAlert from "../../components/ToastAlert";

const Layout = () => {
  return (
    <>
      <ToastAlert />
      <NavBar styleClass="bg-dark shadow" />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
