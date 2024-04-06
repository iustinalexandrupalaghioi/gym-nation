import { Outlet } from "react-router-dom";
import NavBar from "../components/partials/NavBar";

import Cover from "../components/partials/Cover";
import CoverContent from "../components/partials/CoverContent";
import Footer from "../components/partials/Footer";

const Layout = () => {
  return (
    <>
      <Cover>
        <NavBar />
        <CoverContent />
      </Cover>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
