import { Link } from "react-router-dom";
import WorkoutCard from "../components/workouts/WorkoutCard/WorkoutCard";
import ErrorPage from "./ErrorPage";
import WorkoutCardSkeleton from "../components/workouts/WorkoutCardSkeleton";
import useFetchWorkouts from "../hooks/useFetchWorkouts";

const WorkoutsPage = () => {
  const { data, isLoading, error } = useFetchWorkouts();
  const skeletons = [1, 2, 3, 4];
  if (error) return <ErrorPage />;

  return (
    <div className="container px-4 py-5">
      <h1 className="border-bottom pb-2 text-center">
        Antrenează-te ca un profesionist oriunde
      </h1>
      <p className="lead text-center">
        Descoperă instruiri video de înaltă calitate pentru sală, acasă sau aer
        liber.
        <br /> Obține rezultatele dorite, oriunde te-ai afla!
      </p>
      <Link className="btn btn-primary text-light" to="/workouts/new">
        New Workout
      </Link>
      <div className="row mt-5 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
        {isLoading
          ? skeletons.map((skeleton) => <WorkoutCardSkeleton key={skeleton} />)
          : data?.result.map((workout) => (
              <WorkoutCard workout={workout} key={workout.id} />
            ))}
      </div>
    </div>
  );
};

export default WorkoutsPage;
