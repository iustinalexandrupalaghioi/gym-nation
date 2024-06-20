import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config.ts";
import logo from "/images/logo1.png";
import "./NavBar.css";
import SubscriptionButton from "../../account/SubscriptionButton.tsx";
import { useEffect, useState } from "react";
import LoadingButton from "../../account/LoadingButton.tsx";
import SignOutButton from "../../account/SignOutButton.tsx";
import useUserStatusStore from "../../../stores/userStore.ts";
import { FaSliders } from "react-icons/fa6";
import { onAuthStateChanged } from "firebase/auth";
import getUserStatus from "../../../utilities/getUserStatus.ts";
import getUserRole from "../../../utilities/getUserRole.ts";

interface Props {
  styleClass?: string;
}
const NavBar = ({ styleClass }: Props) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const isAdmin = useUserStatusStore((s) => s.userStatus.isAdmin);
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
    <nav
      className={`navbar container-fluid navbar-expand-lg ${
        styleClass && styleClass
      }`}
    >
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} className="img-fluid" style={{ height: "55px" }} />
        </NavLink>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav fs-5 fw-bold ms-auto align-items-lg-center align-items-end">
            <li className="nav-item">
              <NavLink to="/" className="nav-link custom-nav-link">
                Acasă
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blog" className="nav-link custom-nav-link">
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/workouts" className="nav-link custom-nav-link">
                Antrenamente
              </NavLink>
            </li>

            {isLoading ? (
              <li className="nav-item dropdown">
                <LoadingButton
                  textContent="Redirecționare..."
                  styleClass="dropdown-toggle btn btn-outline-info"
                />
              </li>
            ) : (
              <li className="nav-item dropdown">
                {auth.currentUser?.uid ? (
                  <button
                    className="btn btn-outline-info"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaSliders /> Seările Contului
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-info"
                    onClick={() => navigate("/login")}
                  >
                    Autentificare
                  </button>
                )}

                <ul className="dropdown-menu dropdown-menu-dark">
                  <li className="mb-2">
                    <NavLink to="/account" className="dropdown-item">
                      Contul meu
                    </NavLink>
                  </li>
                  {isAdmin ? (
                    <li className="mb-2">
                      <NavLink to="/admin" className="dropdown-item">
                        Panou de Control
                      </NavLink>
                    </li>
                  ) : (
                    <li className="mb-2">
                      <SubscriptionButton
                        styleClass="dropdown-item"
                        setLoading={setLoading}
                      />
                    </li>
                  )}
                  <li className="mb-2">
                    <SignOutButton styleClass="dropdown-item text-danger text-active-light" />
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
