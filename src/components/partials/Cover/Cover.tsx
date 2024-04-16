import { ReactNode } from "react";
import "./Cover.css";

const Cover = ({ children }: { children: ReactNode }) => {
  return (
    <div className="second-cover w-100 d-flex justify-content-center flex-column">
      {children}
    </div>
  );
};

export default Cover;
