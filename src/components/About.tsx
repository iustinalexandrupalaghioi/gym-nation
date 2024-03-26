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
      <h1>{text.title}</h1>
      <p>{text.subtitle}</p>
      <div className="container">
        <p>{text.description}</p>
      </div>
    </section>
  );
};

export default About;
