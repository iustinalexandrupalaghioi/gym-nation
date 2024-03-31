import { faq } from "../../data/faq";
import CollapseFaq from "./CollapseFaq";
import { FaArrowUp } from "react-icons/fa";
import "../../assets/styles/FaqGrid.css";

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
      <div className="d-flex justify-content-end">
        <button
          title="Înapoi sus"
          id="scrollToTopBtn"
          className="btn btn-primary btn-lg text-light rounded-circle d-inline-flex justify-content-center align-items-center p-2"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </button>
      </div>
    </section>
  );
};

export default FaqGrid;
