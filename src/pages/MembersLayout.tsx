import { Outlet } from "react-router-dom";

const MembersLayout = () => {
  return (
    <div>
      Members
      <Outlet />
    </div>
  );
};

export default MembersLayout;
