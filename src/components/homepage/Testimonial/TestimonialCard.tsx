import { FaStar, FaRegStar } from "react-icons/fa";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

interface Props {
  testimonial: QueryDocumentSnapshot<DocumentData, DocumentData>;
}
const TestimonialCard = ({ testimonial }: Props) => {
  const { fname, lname, feedback, stars } = testimonial.data();
  let starNumber = [];
  let regStars = [];
  if (stars < 5) {
    for (let i = 0; i < 5 - stars; i++) {
      regStars[i] = i;
    }
  }
  for (let i = 0; i < stars; i++) {
    starNumber[i] = i;
  }
  return (
    <div
      className="card bg-body-tertiary h-100 p-4 rounded-4 border-0 shadow d-flex flex-column justify-content-between"
      id={`testimonial-${testimonial.id}`}
    >
      <p className="">{feedback}</p>
      <div className=" d-flex gap-2 align-items-center">
        <div className="author d-flex flex-column">
          <h5 className="card-title">
            {fname} {lname}
          </h5>
          <div className="d-flex">
            <p className="text-primary">
              {starNumber && starNumber.map((star) => <FaStar key={star} />)}
              {regStars && regStars.map((star) => <FaRegStar key={star} />)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
