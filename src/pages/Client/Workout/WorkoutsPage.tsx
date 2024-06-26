import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import ToastAlert from "../../../components/ToastAlert";
import WorkoutCard from "../../../components/workouts/WorkoutCard/WorkoutCard";
import WorkoutCardSkeleton from "../../../components/workouts/WorkoutCardSkeleton";
import useFetchWorkouts from "../../../hooks/Workout/useFetchWorkouts";

import ErrorPage from "../ErrorPage";

const WorkoutsPage = () => {
  const { data, isLoading, error } = useFetchWorkouts();

  if (error) return <ErrorPage />;

  return (
    <div className="container px-4 py-5 min-vh-100">
      <ToastAlert />
      <h1 className="border-bottom pb-2 text-center">
        Antrenează-te ca un <span className="text-primary">profesionist</span>
      </h1>
      <p className="lead text-center">
        Descoperă instruiri <span className="text-primary">video</span> de
        înaltă calitate pentru sală, acasă sau aer liber.
        <br /> Obține rezultatele dorite,{" "}
        <span className="text-primary">oriunde</span> te-ai afla!
      </p>
      <div className="row mt-5 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center justify-content-md-start">
        {isLoading ? (
          <WorkoutCardSkeleton />
        ) : (
          data?.result.map(
            (workout: QueryDocumentSnapshot<DocumentData, DocumentData>) => (
              <WorkoutCard workout={workout} key={workout.id} />
            )
          )
        )}
      </div>
    </div>
  );
};

export default WorkoutsPage;
