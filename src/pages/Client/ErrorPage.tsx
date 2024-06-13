import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
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
