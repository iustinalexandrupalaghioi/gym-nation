import { FaArrowRight } from "react-icons/fa6";
import { ReactNode } from "react";

const HomeHeader = ({ children }: { children: ReactNode }) => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header className="header d-flex flex-column justify-content-center align-items-center">
      {children}
      <div className="row h-100 d-flex flex-column justify-content-center align-items-center">
        <div className="text-center text-light mb-5">
          <h1 className="fw-bold hero-title">
            Join the Nation, <span className="green-text">Get Fit</span> with
            <span className="green-text"> Gym Nation</span>!
          </h1>
          <p className="hero-paragraph">Imposibilul nu există.</p>
          <div className="buttons">
            <a
              className="btn btn-primary btnPrimary rounded-4 d-inline-flex align-items-center gap-1 text-light"
              href="/members"
            >
              Începe
              <FaArrowRight />
            </a>
            <button
              className="btn btn-outline-secondary ms-2 rounded-4"
              onClick={scrollToAbout}
            >
              Detalii
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
