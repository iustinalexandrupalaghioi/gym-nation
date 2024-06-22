import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import "./workout-card.css";
import useUserStatusStore from "../../../stores/userStore";
import { useNavigate } from "react-router-dom";
import showToast, { Method } from "../../../utilities/showToast";

interface Props {
  workout: QueryDocumentSnapshot<DocumentData, DocumentData>;
}
const WorkoutCard = ({ workout }: Props) => {
  const { title, imageURL, titleSlug } = workout.data();
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
    <div className="col-10 col-md-5 mb-5 mb-xl-0">
      <div className="card workout-card w-100 h-100">
        <img
          src={imageURL}
          className="card-img-top"
          height={"200px"}
          alt={title}
        />
        <div className="card-body">
          <h4
            className="card-title fw-bold cursor-pointer"
            onClick={handleClick}
          >
            {title}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
