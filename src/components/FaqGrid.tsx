import { faq } from "../data/faq";
import CollapseFaq from "./CollapseFaq";

const FaqGrid = () => {
  return (
    <section className="container px-4 py-5" id="faq">
      <h2 className="pb-2 border-bottom text-center">Întrebări frecvente</h2>
      <div className="row faq gap-2 py-4 mx-auto">
        {faq.map((question, index) => (
          <CollapseFaq key={index} question={question} />
        ))}
      </div>
    </section>
  );
};

export default FaqGrid;
