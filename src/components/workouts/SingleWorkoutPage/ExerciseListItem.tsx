interface Props {
  exercise: Exercise;
  activeExercise: Exercise | undefined;
  setExercise: React.Dispatch<React.SetStateAction<Exercise | undefined>>;
}
import Exercise from "../../../entities/Exercise";
import "./singleWorkout.css";
const ExerciseListItem = ({
  exercise,
  activeExercise,

  setExercise,
}: Props) => {
  return (
    <li
      onClick={() => {
        setExercise(exercise);
      }}
      className={`list-group-item list-group-item-action cursor-pointer border-0 ${
        activeExercise?.nameSlug === exercise.nameSlug
          ? "active fw-bold"
          : "text-body-secondary"
      }`}
    >
      {exercise.name}
    </li>
  );
};

export default ExerciseListItem;
