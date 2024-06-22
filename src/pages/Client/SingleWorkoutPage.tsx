import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import ExerciseContent from "../../components/workouts/SingleWorkoutPage/ExerciseContent";
import ExerciseListItem from "../../components/workouts/SingleWorkoutPage/ExerciseListItem";
import WorkoutExercise from "../../components/workouts/SingleWorkoutPage/WorkoutExercise";
import Exercise from "../../entities/Exercise";
import useWorkout from "../../hooks/useWorkout";
import useExerciseQueryStore from "../../stores/exerciseQueryStore";
import ErrorPage from "./ErrorPage";
import useUserStatusStore from "../../stores/userStore";
import LoadingStatus from "../../components/LoadingStatus";
import Header from "../../components/dashboard/Header";

const SingleWorkoutPage = () => {
  const { slug } = useParams();
  const { data: workouts, error, isLoading } = useWorkout("titleSlug", slug!);
  const exercises: Exercise[] = workouts?.result?.[0].data().exercises;
  const workout = workouts?.result?.[0];
  const setExercise = useExerciseQueryStore((s) => s.setExercise);
  const {
    userStatus: { isPremium, isAdmin },
  } = useUserStatusStore();
  console.log(isAdmin);

  //scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //set first exercise to be active
  useEffect(() => {
    if (workouts && workouts.result && workouts.result.length > 0) {
      const firstExercise: Exercise = workouts.result[0].data().exercises[0];
      firstExercise && setExercise(firstExercise);
    }
  }, [workouts]);

  if (error) return <ErrorPage />;

  if (isAdmin || isPremium) {
    return (
      <>
        <Header />
        {isLoading ? (
          <LoadingStatus />
        ) : (
          <div className="row w-100">
            <WorkoutExercise>
              {exercises.map((exercise: Exercise) => (
                <ExerciseListItem exercise={exercise} key={exercise.name} />
              ))}
            </WorkoutExercise>
            <ExerciseContent workout={workout} />
          </div>
        )}
      </>
    );
  }
  return <Navigate to="/account" />;
};

export default SingleWorkoutPage;
