import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase-config.ts";

import "./NavBar.css";
import logo from "/images/logo1.png";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [authBtnText, setAuthBtnText] = useState("Autentificare");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthBtnText("Deconectare");
      } else {
        setAuthBtnText("Autentificare");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async () => {
    if (auth.currentUser) {
      try {
        await signOut(auth);
        navigate("/");
      } catch (err: any) {
        console.error("User could not be loged out", err.message);
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <nav className={`navbar container-fluid navbar-expand-lg`}>
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
                Antrenamente
              </NavLink>
            </li>
            {auth.currentUser && (
              <li className="nav-item">
                <NavLink to="/workouts/user" className="nav-link">
                  Antrenamentele mele
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <button
                className="btn btn-primary text-light"
                onClick={handleAuth}
              >
                {authBtnText}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
