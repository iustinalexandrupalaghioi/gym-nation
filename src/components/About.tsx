const About = ({
  text,
}: {
  text: { title: string; subtitle?: string; description: string };
}) => {
  return (
    <section
      id="about"
      className="container text-center mt-5 d-flex flex-column align-items-center"
    >
      <h1 className="fw-bold">{text.title}</h1>
      <p>{text.subtitle}</p>
      <br />
      <p className="w-50">{text.description}</p>
    </section>
  );
};

export default About;
