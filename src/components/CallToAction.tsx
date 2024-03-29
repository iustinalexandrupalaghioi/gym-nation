import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section
      className="call-to-action container rounded-4 my-4 py-2 shadow-lg"
      id="call-to-action"
    >
      <div className="container d-flex flex-column align-items-center">
        <h4 className="text-light text-center">
          Contactează-ne acum și începe antrenamentul <br /> de oriunde te afli
        </h4>
        <Link className="btn btn-primary text-light" to="/contact">
          Contactează-ne Acum
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
