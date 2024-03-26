import logo from "/images/logo1.png";
import { Link, useLocation } from "react-router-dom";
import { links } from "../data/links";

const NavBar = () => {
  const { pathname } = useLocation();
  return (
    <nav className="navbar container-xl navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} className="object-fit-cover" height="60px" />
        </Link>
        <button
          className="navbar-toggler"
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
            {links.map((link) => (
              <li key={link.id} className="nav-item">
                <Link
                  className={
                    link.path === "/members"
                      ? "btn btn-primary text-light rounded-4"
                      : pathname === link.path
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to={link.path}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
