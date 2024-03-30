const Footer = () => {
  return (
    <section className="footer bg-primary container-fluid text-light px-5 py-4">
      <footer>
        <p className="text-center text-light">
          © {new Date().getFullYear()} Gym Nation România
        </p>
      </footer>
    </section>
  );
};

export default Footer;
