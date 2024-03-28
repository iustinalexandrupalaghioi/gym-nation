import { Link } from "react-router-dom";

const CoverText = () => {
  const scrollToServices = () => {
    const services = document.getElementById("services");
    services?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="row h-100 align-items-center">
      <div className="px-4 py-5 my-5 text-center text-light">
        <h1 className="display-5 fw-bold text-light">
          Join the Nation, <span className="green-text">Get Fit</span> with
          <span className="green-text"> Gym Nation</span>!
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Imposibilul nu există.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link
              type="button"
              className="btn btn-primary px-4  gap-3 text-light"
              to="/members"
            >
              Începe Acum
            </Link>
            <button
              type="button"
              className="btn btn-outline-info  px-4"
              onClick={scrollToServices}
            >
              Vezi mai mult
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverText;
