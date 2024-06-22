import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const WorkoutExercise = ({ children }: Props) => {
  return (
    <div className="sidebar border-0 col-md-5 col-lg-4 col-xl-3 p-0 ps-md-2">
      <div
        className="offcanvas-md offcanvas-end"
        tabIndex={-1}
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body d-md-flex flex-column overflow-y-auto p-0">
          <ul className="nav flex-column list-group list-group-actions rounded-0">
            {children}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WorkoutExercise;
