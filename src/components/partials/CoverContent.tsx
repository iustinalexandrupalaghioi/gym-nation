import { useLocation } from "react-router-dom";
import { links } from "../../data/links";

const CoverContent = () => {
  const { pathname } = useLocation();
  const page = links.find((link) => link.path === pathname);
  return (
    <div className="row w-100 m-0 px-4 h-100 d-flex flex-column align-items-center justify-content-center text-center">
      <h1 className="display-5 fw-bold text-light">
        <span className="text-primary">{page?.name}</span>
      </h1>
    </div>
  );
};

export default CoverContent;
