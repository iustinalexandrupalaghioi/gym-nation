import { NavLink, Outlet, useLocation } from "react-router-dom";
import CollapseMenuItem from "./CollapseMenuItem";
import NavItem from "./NavItem";

const DashboardBody = () => {
  const { pathname } = useLocation();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
          <div
            className="offcanvas-md offcanvas-end bg-body-tertiary"
            tabIndex={-1}
            id="sidebarMenu"
            aria-labelledby="sidebarMenuLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="sidebarMenuLabel">
                Gym Nation România
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                data-bs-target="#sidebarMenu"
                aria-label="Close"
              ></button>
            </div>

            {/* Navigation menu items */}
            <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavItem pathname={pathname} targetPath="/admin">
                    Acasă
                  </NavItem>
                </li>
                <CollapseMenuItem menuId="blogMenu" menuTitle="Blog">
                  <NavItem pathname={pathname} targetPath="/admin/blog/new">
                    Articol nou
                  </NavItem>
                </CollapseMenuItem>
              </ul>

              {/* sign out button */}
              <hr className="my-3" />
              <ul className="nav flex-column mb-auto">
                <li className="nav-item">
                  <a
                    className="nav-link d-flex align-items-center gap-2"
                    href="#"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardBody;
