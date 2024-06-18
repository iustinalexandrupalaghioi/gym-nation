import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ExerciseContent from "../../components/workouts/SingleWorkoutPage/ExerciseContent";
import ExerciseListItem from "../../components/workouts/SingleWorkoutPage/ExerciseListItem";
import Header from "../../components/workouts/SingleWorkoutPage/Header";
import WorkoutExercise from "../../components/workouts/SingleWorkoutPage/WorkoutExercise";
import Exercise from "../../entities/Exercise";
import useWorkout from "../../hooks/useWorkout";
import useExerciseQueryStore from "../../stores/exerciseQueryStore";
import ErrorPage from "./ErrorPage";
import useUserStatusStore from "../../stores/userStore";
import LoadingStatus from "../../components/LoadingStatus";

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
        <main className="px-4 py-5 mt-5 mt-md-0">
          {isLoading ? (
            <LoadingStatus />
          ) : (
            <div className="row row-cols-1 row-cols-md-2 p-0 py-lg-4 px-lg-2">
              <WorkoutExercise>
                {exercises.map((exercise: Exercise) => (
                  <ExerciseListItem exercise={exercise} key={exercise.name} />
                ))}
              </WorkoutExercise>
              <ExerciseContent workout={workout} />
            </div>
          )}
        </main>
      </>
    );
  }
  return <Navigate to="/account" />;
};

export default SingleWorkoutPage;
