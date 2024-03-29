import { ReactNode } from "react";

const HomeCover = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="cover cover-container vh-100 w-100 d-flex justify-content-center flex-column"
      id="header"
    >
      {children}
    </div>
  );
};

export default HomeCover;
