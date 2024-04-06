import { createElement } from "react";
import { FaInstagram, FaFacebookSquare, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const icnonsMap = {
    facebook: FaFacebookSquare,
    instagram: FaInstagram,
    tiktok: FaTiktok,
  };
  const socialMedia = [
    { id: 1, link: "", name: "Facebook", icon: icnonsMap["facebook"] },
    { id: 2, link: "", name: "Instagram", icon: icnonsMap["instagram"] },
    { id: 3, link: "", name: "TikTok", icon: icnonsMap["tiktok"] },
  ];

  return (
    <footer className="container d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center justify-content-center fs-5">
        <a href="/" className="mb-3 me-2 mb-md-0  text-decoration-none lh-1">
          <svg className="bi" width="30" height="24">
            //logo
          </svg>
        </a>
        <span className="mb-3 mb-md-0 ">
          © {new Date().getFullYear()} Gym nation România
        </span>
      </div>

      <ul className="col-md-4 justify-content-end list-unstyled d-flex gap-2 fs-4">
        {socialMedia.map(({ id, link, name, icon }) => (
          <li key={id}>
            <a href={link} aria-label={name}>
              {createElement(icon)}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
