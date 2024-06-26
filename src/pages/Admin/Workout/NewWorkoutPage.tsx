import { useState } from "react";
import PageContent from "../../../components/dashboard/PageContent";
import NewExercise from "../../../components/workouts/NewWorkout/NewExercise";
import NewWorkoutForm from "../../../components/workouts/NewWorkout/NewWorkoutForm";
import NewWorkoutSectionModal from "../../../components/workouts/NewWorkout/NewWorkoutSectionModal";
import Workout from "../../../entities/Workout";

const NewWorkout = () => {
  const [workout, setWorkout] = useState<Workout>({
    title: "",
    workoutDescription: "",
    image: null,
    sections: [],
  });

  return (
    <PageContent pageTitle="Adaugă un nou antrenament">
      <NewWorkoutForm workout={workout} setWorkout={setWorkout} />
      <NewWorkoutSectionModal
        numberOfSections={workout.sections.length}
        setWorkout={setWorkout}
      />
      <NewExercise sections={workout.sections} setWorkout={setWorkout} />
    </PageContent>
  );
};

export default NewWorkout;
