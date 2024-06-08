interface Props {
  exercise: any;
  handleClick: React.Dispatch<React.SetStateAction<string>>;
}
import "./singleWorkout.css";
const ExerciseListItem = ({ exercise, handleClick }: Props) => {
  return (
    <li
      onClick={() => {
        handleClick(exercise.videoURL);
      }}
      className="text-decoration-none list-group-item text-body-secondary hover-light cursor-pointer d-flex justify-content-between align-items-center mb-2"
    >
      {exercise.name}
    </li>
  );
};

export default ExerciseListItem;
