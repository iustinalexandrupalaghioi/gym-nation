import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  pathname: string;
  targetPath: string;
  children: ReactNode;
}
const NavItem = ({ pathname, targetPath, children }: Props) => {
  return (
    <NavLink
      className={`nav-link hover-light d-flex align-items-center gap-2 ${
        pathname === targetPath ? "text-light" : "text-body-secondary"
      }`}
      to={targetPath}
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
