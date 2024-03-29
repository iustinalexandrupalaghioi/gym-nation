import { faq } from "../data/faq";
import CollapseFaq from "./CollapseFaq";
import { FaArrowUp } from "react-icons/fa";

const FaqGrid = () => {
  const scrollToTop = () => {
    const top = document.getElementById("header");
    top?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="container px-4 py-5" id="faq">
      <h2 className="pb-2 border-bottom text-center">Întrebări frecvente</h2>
      <div className="row faq gap-2 py-4 mx-auto">
        {faq.map((question, index) => (
          <CollapseFaq key={index} question={question} />
        ))}
      </div>
      <button
        title="Spre Pagina de Pornire"
        id="scrollToTopBtn"
        className="btn btn-primary btn-lg text-light rounded-circle d-inline-flex justify-content-center align-items-center p-2"
        onClick={scrollToTop}
      >
        <FaArrowUp />
      </button>
    </section>
  );
};

export default FaqGrid;
