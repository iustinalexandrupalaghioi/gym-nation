import { ReactNode } from "react";

const HomeHeader = ({ children }: { children: ReactNode }) => {
  return (
    <header className="header d-flex flex-column justify-content-center align-items-center">
      {children}
    </header>
  );
};

export default HomeHeader;
