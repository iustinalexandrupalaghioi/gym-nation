import SignOutButton from "../account/SignOutButton";
import NewCategoryModal from "../blog/NewCategoryModal";
import CollapseMenuItem from "./CollapseMenuItem";
import NavItem from "./NavItem";
import NewGroupModal from "../workouts/NewWorkout/NewGroupModal";
import { MdRemoveRedEye } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";

interface Props {
  pathname: string;
}
const Sidebar = ({ pathname }: Props) => {
  return (
    <div className="sidebar border-0 col-md-4 col-lg-3 col-xl-2 p-0 bg-body-tertiary">
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
                Acasă
              </NavItem>
            </li>

            <CollapseMenuItem
              styleClass="nav-item"
              menuId="blogMenu"
              menuTitle="Blog"
            >
              <NavItem pathname={pathname} targetPath="/admin/blog">
                <MdRemoveRedEye />
                Vizualizare Articole
              </NavItem>
              <NavItem pathname={pathname} targetPath="/admin/blog/new">
                <GrFormAdd size={"1rem"} /> Adaugă Articol
              </NavItem>
              <NavItem pathname={pathname} targetPath="/admin/blog/categories">
                <MdRemoveRedEye />
                Vizualizare Categorii
              </NavItem>
              <NewCategoryModal />
            </CollapseMenuItem>
            <CollapseMenuItem menuId="workoutMenu" menuTitle="Antrenamente">
              <NavItem pathname={pathname} targetPath="/admin/workouts">
                <MdRemoveRedEye />
                Vizualizare Antrenamente
              </NavItem>
              <NavItem pathname={pathname} targetPath="/admin/workouts/new">
                <GrFormAdd size={"1rem"} /> Adaugă Antrenament
              </NavItem>
              <NavItem pathname={pathname} targetPath="/admin/workouts/muscles">
                <MdRemoveRedEye />
                Vizualizare Grupe Musculare
              </NavItem>
              <NewGroupModal />
            </CollapseMenuItem>
            <li className="nav-item">
              <NavItem pathname={pathname} targetPath="/admin/customers">
                <MdRemoveRedEye />
                Clienți
              </NavItem>
            </li>
          </ul>

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
