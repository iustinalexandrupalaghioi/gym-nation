import { Link } from "react-router-dom";
import heroImage from "/images/crossfit1.avif";
import { FaArrowRightLong } from "react-icons/fa6";
import scrollToSection from "../../utilities/scrollToSection";

const AboutSection = () => {
  return (
    <section id="about" className="container px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-12 col-lg-6">
          <img
            src={heroImage}
            className=" img-fluid rounded-4 shadow"
            alt="Gym Nation representative picture"
            loading="lazy"
          />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
            Gym Nation România
          </h1>
          <p className="lead">
            Suntem aici pentru a-ți oferi resursele și suportul necesar pentru
            a-ți atinge obiectivele de fitness și a-ți transforma stilul de
            viață. Fie că îți dorești să slăbești, să-ți construiești masă
            musculară sau să îți îmbunătățești sănătatea generală, creăm un plan
            care să se potrivească nevoilor tale specifice.
          </p>
          <div className="d-flex gap-2 flex-column flex-md-row">
            <button
              className="btn btn-outline-info"
              onClick={() => scrollToSection("contactSection")}
            >
              Contactează-ne
            </button>
            <Link
              type="button"
              className="btn btn-primary text-light"
              to="/workouts"
            >
              Începe Acum <FaArrowRightLong />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
