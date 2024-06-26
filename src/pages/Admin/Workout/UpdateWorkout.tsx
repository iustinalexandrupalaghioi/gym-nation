import { useState } from "react";
import { useParams } from "react-router-dom";
import NewWorkoutForm from "../../../components/workouts/NewWorkout/NewWorkoutForm";
import Workout from "../../../entities/Workout";
import useWorkout from "../../../hooks/Workout/useWorkout";

const UpdateWorkout = () => {
  const { titleSlug } = useParams();
  const { data } = useWorkout("titleslug", titleSlug!);
  const workout = data?.result[0].data() as Workout;
  const [newWorkout, setNewWorkout] = useState<Workout>(workout);
  return <NewWorkoutForm workout={newWorkout} setWorkout={setNewWorkout} />;
};

export default UpdateWorkout;
