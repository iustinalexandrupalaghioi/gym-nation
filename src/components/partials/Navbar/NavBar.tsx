import { Link, NavLink, useLocation } from "react-router-dom";
import links from "../../../data/links";
import "./NavBar.css";
import logo from "/images/logo1.png";

const NavBar = () => {
  const { pathname } = useLocation();
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
              <button className="btn btn-primary text-light">
                Autentificare
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
