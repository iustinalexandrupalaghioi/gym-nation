import { Link } from "react-router-dom";
import heroImage from "/images/crossfit1.avif";

const AboutSection = () => {
  return (
    <section id="about" className="container col-xxl-8 px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-12 col-lg-6">
          <img
            src={heroImage}
            className=" img-fluid rounded-4 shadow-lg"
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
            personalizat care să se potrivească nevoilor tale specifice.
          </p>

          <Link
            type="button"
            className="btn btn-primary text-light"
            to="/members"
          >
            Începe Acum
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
