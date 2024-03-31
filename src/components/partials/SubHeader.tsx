import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { links } from "../../data/links";
interface Props {
  children: ReactNode;
}
const SubHeader = ({ children }: Props) => {
  const { pathname } = useLocation();
  const page = links.find((page) => page.path === pathname);

  return (
    <header className="subheader d-flex flex-column align-items-center">
      {children}
      <div className="row d-flex flex-column justify-content-center align-items-center">
        <div className="text-center text-light mb-5">
          <h1 className="fw-bold hero-title">{page?.name}</h1>
        </div>
      </div>
    </header>
  );
};

export default SubHeader;
