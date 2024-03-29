import { Link } from "react-router-dom";

const HomeCoverText = () => {
  const scrollToServices = () => {
    const services = document.getElementById("services");
    services?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="row h-100 w-100  d-flex flex-column justify-content-center text-center">
      <h1 className="display-5 fw-bold text-light">
        Join the Nation, <span className="green-text">Get Fit</span> with
        <span className="green-text"> Gym Nation</span>!
      </h1>
      <p className="lead mb-4 text-light">Imposibilul nu există.</p>
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
  );
};

export default HomeCoverText;
