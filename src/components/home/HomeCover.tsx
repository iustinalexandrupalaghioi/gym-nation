import { ReactNode } from "react";
import "../../assets/styles/HomeCover.css";

const HomeCover = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="cover w-100 vh-100  d-flex justify-content-center flex-column"
      id="header"
    >
      {children}
    </div>
  );
};

export default HomeCover;
