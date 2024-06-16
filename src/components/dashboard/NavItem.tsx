import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  pathname: string;
  targetPath?: string;
  children: ReactNode;
}
const NavItem = ({ pathname, targetPath, children }: Props) => {
  return (
    <NavLink
      className={`nav-link hover hover-primary d-flex align-items-center gap-2 ${
        pathname === targetPath ? "text-primary" : "text-body-secondary"
      }`}
      to={targetPath ? targetPath : pathname}
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
