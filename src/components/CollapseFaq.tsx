import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Question } from "../data/faq";

interface Props {
  question: Question;
}
const CollapseFaq = ({ question: { id, question, response } }: Props) => {
  const [expanded, setExpand] = useState<boolean>(false);
  return (
    <div className="border rounded-2 p-0 d-flex flex-column">
      <button
        className="card question-card w-100 border-0 d-flex flex-row justify-content-between text-sm-start align-items-center gap-1"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#question-${id}`}
        aria-expanded="false"
        aria-controls="collapseWidthExample"
        onClick={() => setExpand(!expanded)}
      >
        <p className={`mb-0 px-2 ${expanded && "text-primary fw-bold"}`}>
          {question}
        </p>
        {expanded ? (
          <p className="mb-0 fs-3">
            <IoIosArrowUp />
          </p>
        ) : (
          <p className="mb-0 fs-3">
            <IoIosArrowDown />
          </p>
        )}
      </button>
      <div className="collapse collapse-vertical w-100" id={`question-${id}`}>
        <div className="card response-card card-body border-0">{response}</div>
      </div>
    </div>
  );
};

export default CollapseFaq;
