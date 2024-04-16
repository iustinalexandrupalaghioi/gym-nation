import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/partials/Navbar/NavBar";
import Cover from "../components/partials/Cover/Cover";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <Cover>
        <NavBar />
      </Cover>
      <div className="p-5">
        <h1>Oops</h1>
        <p>
          {isRouteErrorResponse(error)
            ? "Invalid page"
            : "Unexpected error occured"}
        </p>
      </div>
    </>
  );
};

export default ErrorPage;
