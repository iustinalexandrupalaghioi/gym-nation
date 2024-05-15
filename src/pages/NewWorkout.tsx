import NewExercise from "../components/workouts/NewWorkout/NewExercise";
import NewWorkoutForm from "../components/workouts/NewWorkout/NewWorkoutForm";

const NewWorkout = () => {
  return (
    <div className="container px-4 py-5 vh-100">
      <NewWorkoutForm />
      <NewExercise />
    </div>
  );
};

export default NewWorkout;
