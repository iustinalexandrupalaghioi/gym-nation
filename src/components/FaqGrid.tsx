import { faq } from "../data/faq";
import CollapseFaq from "./CollapseFaq";

const FaqGrid = () => {
  return (
    <div className="container">
      <h2 className="pb-2 border-bottom text-center">Întrebări frecvente</h2>
      <div className="row gap-2 w-75 mx-auto">
        {faq.map((question, index) => (
          <CollapseFaq key={index} question={question} />
        ))}
      </div>
    </div>
  );
};

export default FaqGrid;
