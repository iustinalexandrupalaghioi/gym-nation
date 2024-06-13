import { useState } from "react";
import Workout from "../../entities/Workout";
import NewWorkoutForm from "../../components/workouts/NewWorkout/NewWorkoutForm";
import NewExercise from "../../components/workouts/NewWorkout/NewExercise";

const NewWorkout = () => {
  const [workout, setWorkout] = useState<Workout>({
    title: "",
    workoutDescription: "",
    price: "",
    muscleSlug: "",
    image: null,
    exercises: [],
  });

  return (
    <div className="container px-4 py-5 vh-100">
      <NewWorkoutForm workout={workout} setWorkout={setWorkout} />
      <NewExercise setWorkout={setWorkout} />
    </div>
  );
};

export default NewWorkout;
