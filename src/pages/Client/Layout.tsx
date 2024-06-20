import { Outlet } from "react-router-dom";
import Footer from "../../components/partials/Footer/Footer";
import NavBar from "../../components/partials/Navbar/NavBar";
import ToastAlert from "../../components/ToastAlert";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../firebase-config";
import useUserStatusStore from "../../stores/userStore";
import getUserRole from "../../utilities/getUserRole";
import getUserStatus from "../../utilities/getUserStatus";

const Layout = () => {
  const setStatus = useUserStatusStore((s) => s.setStatus);
  const setRole = useUserStatusStore((s) => s.setRole);
  // Check authentication state and fetch user status and role on page load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, fetch user status and role
        const newUserStatus = await getUserStatus();
        setStatus(newUserStatus);

        const newUserRole = await getUserRole(user.uid);
        setRole(newUserRole);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);
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
