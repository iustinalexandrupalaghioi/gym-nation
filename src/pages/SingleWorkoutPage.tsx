import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/workouts/SingleWorkoutPage/Header";
import ExerciseListItem from "../components/workouts/SingleWorkoutPage/ExerciseListItem";
import WorkoutExercise from "../components/workouts/SingleWorkoutPage/WorkoutExercise";
import Exercise from "../entities/Exercise";
import useWorkout from "../hooks/useWorkout";
import ErrorPage from "./ErrorPage";
import ExerciseContent from "../components/workouts/SingleWorkoutPage/ExerciseContent";

const SingleWorkoutPage = () => {
  const { slug } = useParams();
  const { data: workouts, error, isLoading } = useWorkout("titleSlug", slug!);
  const exercises = workouts?.result?.[0].data().exercises;
  const workout = workouts?.result?.[0];

  const [video, setVideo] = useState<string | undefined>("");
  const [activeExercise, setExercise] = useState<Exercise | undefined>(
    {} as Exercise
  );
  useEffect(() => {
    if (workouts && workouts.result && workouts.result.length > 0) {
      const firstExercise: Exercise = workouts.result[0].data().exercises[0];
      if (firstExercise) {
        const url = firstExercise.videoURL
          ? firstExercise.videoURL
          : firstExercise.videoLink;
        setVideo(url);
        setExercise(firstExercise);
      }
    }
  }, [workouts]);

  if (error) return <ErrorPage />;

  return (
    <>
      <Header />
      <main className="px-4 py-5">
        {isLoading ? (
          <div className="text-center vh-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border" role="status">
              <span>Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 p-0 py-lg-4 px-lg-2">
            <WorkoutExercise>
              {exercises.map((exercise: Exercise) => (
                <ExerciseListItem
                  exercise={exercise}
                  key={exercise.name}
                  activeExercise={activeExercise}
                  setVideo={setVideo}
                  setExercise={setExercise}
                />
              ))}
            </WorkoutExercise>
            <ExerciseContent
              video={video}
              workout={workout}
              exercise={activeExercise}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default SingleWorkoutPage;
