import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import "./workout-card.css";
import useUserStatusStore from "../../../stores/userStore";
import { useNavigate } from "react-router-dom";
import showToast, { Method } from "../../../utilities/showToast";

interface Props {
  workout: QueryDocumentSnapshot<DocumentData, DocumentData>;
}
const WorkoutCard = ({ workout }: Props) => {
  const { title, price, imageURL, titleSlug } = workout.data();
  const isAdmin = useUserStatusStore((s) => s.userStatus.isAdmin);
  const isPremium = useUserStatusStore((s) => s.userStatus.isPremium);
  const navigate = useNavigate();
  const handleClick = () => {
    if (isAdmin || isPremium) {
      navigate("/workouts/" + titleSlug);
    } else {
      showToast(
        "Doar membrii premium au acces la aceste resurse. Te rugăm actualizează-ți profilul.",
        Method.Warning,
        () => navigate("/account")
      );
    }
  };
  return (
    <div className="col-8 col-md-6 mb-5 cursor-pointer" onClick={handleClick}>
      <div className="card workout-card h-100">
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
    </div>
  );
};

export default WorkoutCard;
