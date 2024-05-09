import { NavLink } from "react-router-dom";

import "./NavBar.css";
import logo from "/images/logo1.png";
import { signOut } from "firebase/auth";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
  const auth = useAuth();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Succesfully logged out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <nav className={`navbar container-fluid navbar-expand-lg navbar-dark`}>
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
              <NavLink to="/" className="nav-link">
                Acasă
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blog" className="nav-link">
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/workouts" className="nav-link">
                Servicii
              </NavLink>
            </li>
            <li className="nav-item">
              {auth.currentUser ? (
                <button
                  className="btn btn-primary text-light"
                  onClick={handleSignOut}
                >
                  Deloghează-te
                </button>
              ) : (
                <NavLink className="btn btn-primary text-light" to="/login">
                  Autentificare
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
