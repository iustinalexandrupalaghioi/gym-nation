import Exercise from "../../../entities/Exercise";
import useExerciseQueryStore from "../../../stores/exerciseQueryStore";
import "./singleWorkout.css";

interface Props {
  exercise: Exercise;
}

const ExerciseListItem = ({ exercise }: Props) => {
  const {
    exerciseQuery: { exercise: activeExercise },
    setExercise,
  } = useExerciseQueryStore();

  return (
    <li
      onClick={() => setExercise(exercise)}
      className={`list-group-item list-group-item-action cursor-pointer border-0 ${
        activeExercise?.nameSlug === exercise.nameSlug
          ? "active fw-bold text-light"
          : "text-body-secondary"
      }`}
    >
      {exercise.exerciseName}
    </li>
  );
};

export default ExerciseListItem;
