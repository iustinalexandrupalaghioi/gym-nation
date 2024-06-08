import { useParams } from "react-router-dom";
import useWorkout from "../hooks/useWorkout";
import Exercise from "../entities/Exercise";
import Header from "../components/workouts/SingleWorkoutPage/Header";
import ExerciseListItem from "../components/workouts/SingleWorkoutPage/ExerciseListItem";

const SingleWorkoutPage = () => {
  const { slug } = useParams();
  const response = useWorkout(slug!);
  const exercises: Exercise[] = response?.data().exercises;
  return (
    <>
      <Header />
      <main className="px-4 py-5">
        <div className="row row-cols-1 row-cols-md-2">
          <aside className="col-12 col-md-4">
            <ul className="list-group">
              {exercises.map((exercise: Exercise) => (
                <ExerciseListItem exercise={exercise} />
              ))}
            </ul>
          </aside>
          <div className="col-12 col-md-8">Continut</div>
        </div>
      </main>
    </>
  );
};

export default SingleWorkoutPage;
