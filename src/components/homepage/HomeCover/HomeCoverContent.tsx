import { Link } from "react-router-dom";
import scrollToSection from "../../../utilities/scrollToSection";
import { FaArrowRightLong } from "react-icons/fa6";
const HomeCoverContent = () => {
  return (
    <div className="row w-100 m-0 px-4  h-100 d-flex flex-column align-items-center justify-content-center text-center">
      <h1 className="display-5 fw-bold text-light">
        Join the Nation,
        <span className="text-primary">Get Fit</span> with
        <span className="text-primary"> Gym Nation</span>!
      </h1>
      <p className="lead mb-4 text-light">Imposibilul nu există.</p>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button
          type="button"
          className="btn btn-outline-info  px-4"
          onClick={() => scrollToSection("about")}
        >
          Vezi mai mult
        </button>
        <Link
          type="button"
          className="btn btn-primary text-light px-4"
          to="/workouts"
        >
          Începe Acum <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
};

export default HomeCoverContent;
