import { useState } from "react";
import Workout from "../../entities/Workout";
import NewWorkoutForm from "../../components/workouts/NewWorkout/NewWorkoutForm";
import NewExercise from "../../components/workouts/NewWorkout/NewExercise";
import PageContent from "../../components/dashboard/PageContent";

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
    <PageContent pageTitle="Adaugă un nou antrenament">
      <NewWorkoutForm workout={workout} setWorkout={setWorkout} />
      <NewExercise setWorkout={setWorkout} />
    </PageContent>
  );
};

export default NewWorkout;
