import { useState } from "react";
import NewExercise from "../components/workouts/NewWorkout/NewExercise";
import NewWorkoutForm from "../components/workouts/NewWorkout/NewWorkoutForm";
import Workout from "../entities/Workout";
import Exercise from "../entities/Exercise";

const NewWorkout = () => {
  const [workout, setWorkout] = useState<Workout>({
    title: "",
    desc: "",
    muscleSlug: "",
    image: null,
    exercises: [],
  });
  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    exerciseDescription: "",
    image: null,
    video: null,
    videoURL: "",
  });
  return (
    <div className="container px-4 py-5 vh-100">
      <NewWorkoutForm workout={workout} setWorkout={setWorkout} />
      <NewExercise
        exercise={exercise}
        setWorkout={setWorkout}
        setExercise={setExercise}
      />
    </div>
  );
};

export default NewWorkout;
