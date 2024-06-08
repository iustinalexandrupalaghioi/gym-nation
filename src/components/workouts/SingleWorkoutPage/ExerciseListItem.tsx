import { Link } from "react-router-dom";
interface Props {
  exercise: any;
}
const ExerciseListItem = ({ exercise }: Props) => {
  return (
    <li className="d-flex justify-content-between align-items-center mb-2">
      <Link to="/blog" className={`text-decoration-none`}>
        {exercise.name}
      </Link>
    </li>
  );
};

export default ExerciseListItem;
