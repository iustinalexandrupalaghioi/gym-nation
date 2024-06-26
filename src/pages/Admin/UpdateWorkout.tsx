import NewWorkoutForm from "../../components/workouts/NewWorkout/NewWorkoutForm";
import { useState } from "react";
import Workout from "../../entities/Workout";
import { useParams } from "react-router-dom";
import useWorkout from "../../hooks/useWorkout";

const UpdateWorkout = () => {
  const { titleSlug } = useParams();
  const { data } = useWorkout("titleslug", titleSlug!);
  const workout = data?.result[0].data() as Workout;
  const [newWorkout, setNewWorkout] = useState<Workout>(workout);
  return <NewWorkoutForm workout={newWorkout} setWorkout={setNewWorkout} />;
};

export default UpdateWorkout;
