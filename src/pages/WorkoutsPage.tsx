import { Link } from "react-router-dom";
import WorkoutCard from "../components/workouts/WorkoutCard/WorkoutCard";

const WorkoutsPage = () => {
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
      <div className="row mt-5 row-cols-1 row-cols-md-2 row-cols-lg-3">
        <div className="col">
          <Link to="/workouts/:id" className="text-decoration-none">
            <WorkoutCard />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkoutsPage;
