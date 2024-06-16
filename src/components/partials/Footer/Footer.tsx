import { createElement } from "react";
import { FaInstagram, FaFacebookSquare, FaTiktok } from "react-icons/fa";
import logo from "/images/logo1.png";

const Footer = () => {
  const icnonsMap = {
    facebook: FaFacebookSquare,
    instagram: FaInstagram,
    tiktok: FaTiktok,
  };
  const socialMedia = [
    {
      id: 1,
      link: "",
      name: "Facebook",
      icon: icnonsMap["facebook"],
    },
    { id: 2, link: "", name: "Instagram", icon: icnonsMap["instagram"] },
    { id: 3, link: "", name: "TikTok", icon: icnonsMap["tiktok"] },
  ];

  return (
    <footer className="container d-flex flex-column flex-lg-row justify-content-center align-items-center py-3 my-4 gap-2 border-top">
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

      <ul className="col-md-4 justify-content-center  align-items-center list-unstyled d-flex gap-2 fs-4">
        {socialMedia.map(({ id, link, name, icon }) => (
          <li key={id} className="nav-item">
            <a
              target="_blank"
              href={link}
              className="text-body-secondary hover hover-light"
              aria-label={name}
            >
              {createElement(icon)}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
