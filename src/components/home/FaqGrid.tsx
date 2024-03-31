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
    <>
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
    </>
  );
};

export default FaqGrid;
