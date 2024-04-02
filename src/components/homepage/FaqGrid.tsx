import { faq } from "../../data/faq";
import CollapseFaq from "./CollapseFaq";

import "../../assets/styles/FaqGrid.css";

const FaqGrid = () => {
  return (
    <div className="row faq gap-2 py-4 mx-auto">
      {faq.map((question, index) => (
        <CollapseFaq key={index} question={question} />
      ))}
    </div>
  );
};

export default FaqGrid;
