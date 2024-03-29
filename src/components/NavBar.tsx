import { Link, useLocation } from "react-router-dom";
import { links } from "../data/links";

const NavBar = () => {
  const { pathname } = useLocation();
  return (
    <header>
      <nav className="navbar container-xl navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            GymNationRomania
          </Link>
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
              {links.map((link) => (
                <li key={link.id} className="nav-item">
                  <Link
                    className={
                      link.path === "/members"
                        ? "btn btn-primary text-light"
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
    </header>
  );
};

export default NavBar;
