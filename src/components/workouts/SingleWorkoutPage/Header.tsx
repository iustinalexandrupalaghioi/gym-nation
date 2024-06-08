import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./singleWorkout.css";
const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid px-4 py-2">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto my-2 my-md-0">
              <li className="nav-item">
                <NavLink
                  className="d-flex align-items-center gap-1 fs-4 hover-light text-body-secondary"
                  aria-disabled="true"
                  to="/"
                >
                  <FaHome />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
