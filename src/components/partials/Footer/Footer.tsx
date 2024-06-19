import FeedbackModal from "../FeedbackModal";
import logo from "/images/logo1.png";

const Footer = () => {
  return (
    <footer className="container d-flex flex-column flex-lg-row justify-content-center align-items-center py-3 my-4 gap-2 border-top">
      <FeedbackModal />
      <div className="col-md-4 d-flex justify-content-center align-items-center">
        <a href="/" className="mb-3 text-decoration-none lh-1">
          <img src={logo} style={{ height: "55px" }} alt="gym nation logo" />
        </a>
      </div>
      <div className="col-md-4 d-flex align-items-center justify-content-center  text-center fs-5">
        <span className="mb-3">
          © {new Date().getFullYear()} Gym Nation România
        </span>
      </div>

      <ul className="col-md-4 justify-content-center  align-items-center list-unstyled d-flex gap-2 fs-5">
        <li className="nav-item">
          <span
            className="text-body-secondary hover hover-light cursor-pointer"
            data-bs-toggle="modal"
            data-bs-target="#feedbackModal"
          >
            Lasă-ne un feedback
          </span>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
