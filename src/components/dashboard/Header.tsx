import { NavLink } from "react-router-dom";
import logo from "/images/logo1.png";

const Header = () => {
  return (
    <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} className="img-fluid" style={{ height: "55px" }} />
        </NavLink>
        <ul className="navbar-nav flex-row d-md-none">
          <li className="nav-item text-nowrap">
            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
