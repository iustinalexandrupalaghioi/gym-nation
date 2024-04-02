import { FaArrowUp } from "react-icons/fa";
import scrollToSection from "../../services/scrollToSection";

interface Props {
  sectionId: string;
}
const ScrollToButton = ({ sectionId }: Props) => {
  return (
    <div className="container mb-5 d-flex justify-content-end">
      <button
        title="Înapoi sus"
        id="scrollToTopBtn"
        className="btn btn-primary btn-lg text-light rounded-circle d-inline-flex justify-content-center align-items-center p-2"
        onClick={() => scrollToSection(sectionId)}
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default ScrollToButton;
