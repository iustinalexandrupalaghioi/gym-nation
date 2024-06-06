import { Outlet } from "react-router-dom";
import NavBar from "../components/partials/Navbar/NavBar";

import Footer from "../components/partials/Footer/Footer";

const Layout = () => {
  return (
    <>
      <NavBar />

      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
