import SignOutButton from "../account/SignOutButton";
import NewCategoryModal from "../blog/Categories/NewCategoryModal";
import NewGroupModal from "../workouts/NewWorkout/NewGroupModal";
import CollapseMenuItem from "./CollapseMenuItem";
import NavItem from "./NavItem";

interface Props {
  pathname: string;
}
const Sidebar = ({ pathname }: Props) => {
  return (
    <div className="sidebar border-0 col-md-4 col-xl-3 p-0 bg-body-tertiary">
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

        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavItem pathname={pathname} targetPath="/admin">
                Panou de Control
              </NavItem>
            </li>

            <CollapseMenuItem menuId="blogMenu" menuTitle="Blog">
              <NavItem pathname={pathname} targetPath="/admin/blog/new">
                Adaugă Articol
              </NavItem>
              <NewCategoryModal />
            </CollapseMenuItem>
            <CollapseMenuItem menuId="workoutMenu" menuTitle="Antrenamente">
              <NavItem pathname={pathname} targetPath="/admin/workouts/new">
                Adaugă Antrenament
              </NavItem>
              <NewGroupModal />
            </CollapseMenuItem>
            <li className="nav-item">
              <NavItem pathname={pathname} targetPath="/admin/customers">
                Clienți
              </NavItem>
            </li>
          </ul>

          {/* sign out button */}
          <hr className="my-3" />
          <ul className="nav flex-column mb-3">
            <li className="nav-item">
              <SignOutButton styleClass="btn btn-outline-danger ms-2" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
