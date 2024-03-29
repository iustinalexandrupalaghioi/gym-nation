import { FaRegCopyright } from "react-icons/fa";
const Footer = () => {
  return (
    <section className="footer container-fluid d-flex flex-column text-center gap-3 justify-content-center bg-primary text-light px-5 py-4">
      <p>
        Copyright <FaRegCopyright /> Gym Nation România,{" "}
        {new Date().getFullYear()}
        <br />
      </p>
    </section>
  );
};

export default Footer;
