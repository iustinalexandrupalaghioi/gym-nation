import { useParams } from "react-router-dom";
import Header from "../components/workouts/SingleWorkoutPage/Header";
import ExerciseListItem from "../components/workouts/SingleWorkoutPage/ExerciseListItem";
import WorkoutExercise from "../components/workouts/SingleWorkoutPage/WorkoutExercise";
import ExerciseVideoContent from "../components/workouts/SingleWorkoutPage/ExerciseVideoContent";
import Exercise from "../entities/Exercise";
import useWorkout from "../hooks/useWorkout";
import ErrorPage from "./ErrorPage";
import { useEffect, useState } from "react";

const SingleWorkoutPage = () => {
  const { slug } = useParams();
  const { data: workouts, error, isLoading } = useWorkout("titleSlug", slug!);
  const exercises = workouts?.result?.[0].data().exercises;

  const [video, setVideo] = useState<string>("");
  useEffect(() => {
    if (workouts && workouts.result && workouts.result.length > 0) {
      const firstExercise = workouts.result[0].data().exercises[0];
      if (firstExercise) {
        const url = firstExercise.videoURL
          ? firstExercise.videoURL
          : firstExercise.videoLink;
        setVideo(url);
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
          <div className="row row-cols-1 row-cols-md-2">
            <WorkoutExercise>
              {exercises.map((exercise: Exercise) => (
                <ExerciseListItem
                  exercise={exercise}
                  key={exercise.name}
                  setVideo={setVideo}
                />
              ))}
            </WorkoutExercise>
            <ExerciseVideoContent video={video} />
          </div>
        )}
      </main>
    </>
  );
};

export default SingleWorkoutPage;
