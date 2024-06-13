import { NavLink } from "react-router-dom";
import { auth } from "../../../firebase-config";
const NavLinks = () => {
  return (
    <>
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
    </>
  );
};

export default NavLinks;
