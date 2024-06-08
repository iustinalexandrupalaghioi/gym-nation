interface Props {
  exercise: any;
  setVideo: React.Dispatch<React.SetStateAction<string>>;
}
import "./singleWorkout.css";
const ExerciseListItem = ({ exercise, setVideo }: Props) => {
  return (
    <li
      onClick={() => {
        setVideo(exercise.videoURL ? exercise.videoURL : exercise.videoLink);
      }}
      className="text-decoration-none list-group-item text-body-secondary hover-light cursor-pointer d-flex justify-content-between align-items-center mb-2"
    >
      {exercise.name}
    </li>
  );
};

export default ExerciseListItem;
