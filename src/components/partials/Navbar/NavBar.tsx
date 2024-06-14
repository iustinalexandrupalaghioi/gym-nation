import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase-config.ts";

import "./NavBar.css";
import logo from "/images/logo1.png";
import { useEffect, useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const [isLogged, setLogged] = useState<boolean>(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAuth = async () => {
    if (auth.currentUser) {
      navigate("/account");
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
            {isLogged && (
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
                Contul meu
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
