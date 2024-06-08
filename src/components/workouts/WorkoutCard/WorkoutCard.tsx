import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import "./workout-card.css";

interface Props {
  workout: QueryDocumentSnapshot<DocumentData, DocumentData>;
}
const WorkoutCard = ({ workout }: Props) => {
  const { title, desc, price, imageURL } = workout.data();
  return (
    <div className="col mb-5 mb-xl-0">
      <div className="card workout-card w-100 h-100">
        <img src={imageURL} className="card-img-top" alt={title} />
        <div className="card-body">
          <h4 className="card-title fw-bold">{title}</h4>
          <p className="card-text">{desc}</p>
          <h5 className="card-text fw-bold">
            <span className="text-primary fw-bold">{price}</span> de lei
          </h5>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
