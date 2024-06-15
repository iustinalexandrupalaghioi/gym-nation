import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";

const DashboardBody = () => {
  const [expanded, setExpand] = useState<boolean>(false);
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
                  <NavLink
                    className="nav-link text-body-secondary hover-light d-flex align-items-center gap-2 active"
                    to="/admin"
                  >
                    Acasă
                  </NavLink>
                </li>
                <li className="nav-item">
                  <div className="p-0 d-flex flex-column">
                    <button
                      className="bg-body-tertiary border-0 d-flex flex-row justify-content-between text-sm-start align-items-center gap-1"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#blogMenu"
                      aria-expanded="false"
                      aria-controls="collapseWidthExample"
                      onClick={() => setExpand(!expanded)}
                    >
                      <p
                        className={`mb-0 px-2 ${
                          expanded
                            ? "text-primary fw-bold"
                            : "text-body-secondary"
                        }`}
                      >
                        Blog
                      </p>
                      {expanded ? (
                        <p className="mb-0 fs-3">
                          <IoIosArrowUp />
                        </p>
                      ) : (
                        <p className="mb-0 fs-3">
                          <IoIosArrowDown />
                        </p>
                      )}
                    </button>
                    <div
                      className="collapse collapse-vertical w-100"
                      id="blogMenu"
                    >
                      <NavLink
                        className="nav-link text-body-secondary hover-light d-flex align-items-center gap-2 active"
                        to="/admin/blog/new"
                      >
                        Articol Nou
                      </NavLink>
                    </div>
                  </div>
                </li>
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
