import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import "./workout-card.css";
import { Link } from "react-router-dom";

interface Props {
  workout: QueryDocumentSnapshot<DocumentData, DocumentData>;
}
const WorkoutCard = ({ workout }: Props) => {
  const { title, price, imageURL, titleSlug } = workout.data();
  return (
    <div className="col mb-5">
      <Link
        key={workout.id}
        to={`/workouts/${titleSlug}`}
        className="text-decoration-none"
      >
        <div className="card workout-card w-100 h-100">
          <img
            src={imageURL}
            className="card-img-top"
            height={"200px"}
            alt={title}
          />
          <div className="card-body">
            <h4 className="card-title fw-bold">{title}</h4>
            <h5 className="card-text fw-bold">
              <span className="text-primary fw-bold">{price}</span> de lei
            </h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WorkoutCard;
