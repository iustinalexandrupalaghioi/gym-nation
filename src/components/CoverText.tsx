const CoverText = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="row h-100 align-items-center">
      <div className="text-center text-light px-5">
        <h1 className="fw-bold display-4  hero-title">
          Join the Nation, <span className="green-text">Get Fit</span> with
          <span className="green-text"> Gym Nation</span>!
        </h1>
        <p className="hero-paragraph lead">Imposibilul nu există.</p>
        <div className="buttons">
          <a
            className="btn btn-primary btnPrimary d-inline-flex align-items-center gap-1 text-light"
            href="/members"
          >
            Începe Acum
          </a>
          <button className="btn btn-outline-info ms-2" onClick={scrollToAbout}>
            Vezi mai mult
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoverText;
