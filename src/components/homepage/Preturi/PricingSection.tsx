import scrollToSection from "../../../utilities/scrollToSection";
import { Link } from "react-router-dom";

const PricingSection = () => {
  return (
    <div className="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center py-5">
      <div className="col" style={{ minHeight: "max-content", width: "22rem" }}>
        <div className="card bg-body-tertiary border-0 shadow mb-4 rounded-3 h-100 w-100">
          <div className="card-header py-3">
            <h4 className="my-0 fw-normal">Gratuit</h4>
          </div>
          <div className="card-body d-flex flex-column justify-content-between align-items-center">
            <h1 className="card-title pricing-card-title">
              <span className="text-primary">0.00 RON </span>
              <small className="text-body-secondary fw-light">/lună</small>
            </h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li>Acces la resursele gratuite din blog</li>
              <li>Răspunsuri la întrebări pe mail</li>
            </ul>
            <Link
              to={"/register"}
              type="button"
              className="w-100 btn btn-lg btn-outline-primary btnOutline"
            >
              Înscrie-te
            </Link>
          </div>
        </div>
      </div>
      <div className="col" style={{ minHeight: "max-content", width: "22rem" }}>
        <div className="card mb-4 rounded-3  bg-body-tertiary border-0 shadow  h-100 w-100">
          <div className="card-header py-3">
            <h4 className="my-0 fw-normal">Consultație Nutriție</h4>
          </div>
          <div className="card-body d-flex flex-column justify-content-between align-items-center">
            <h1 className="card-title pricing-card-title">
              <span className="text-primary">100 RON </span>
              <small className="text-body-secondary fw-light">/sesiune</small>
            </h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li>O consultație gratuită</li>
              <li>Planuri de masă personalizate</li>
              <li>Recomandări alimentare</li>
              <li>Suport prin email</li>
            </ul>
            <button
              type="button"
              className="w-100 btn btn-lg btn-primary text-light"
              onClick={() => scrollToSection("contactSection")}
            >
              Contactează-ne
            </button>
          </div>
        </div>
      </div>
      <div className="col" style={{ minHeight: "max-content", width: "22rem" }}>
        <div className="card mb-4 rounded-3 bg-body-tertiary border-0 shadow border-primary h-100 w-100">
          <div className="card-header py-3 text-bg-primary border-primary">
            <h4 className="my-0 fw-normal text-light">Premium</h4>
          </div>
          <div className="card-body d-flex flex-column align-items-center justify-content-between">
            <h1 className="card-title pricing-card-title">
              <span className="text-primary">50 RON </span>
              <small className="text-body-secondary fw-light">/lună</small>
            </h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li>Acces la antrenamentele video</li>
              <li>Planuri de antrenament personalizate</li>
              <li>Acces la resursele gratuite din blog</li>
              <li>Acces la comunitate</li>
            </ul>
            <Link
              to={"/account"}
              type="button"
              className="w-100 btn btn-lg btn-primary text-light"
            >
              Începe acum
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
