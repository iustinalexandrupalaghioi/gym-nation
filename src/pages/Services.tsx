import { Link } from "react-router-dom";
import "../components/workouts/workout-card.css";

const Services = () => {
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
      <div className="row mt-5 row-cols-1 row-cols-md-2 row-cols-lg-3">
        <div className="col">
          <Link to="/workouts/:id" className="text-decoration-none">
            <div className="card workout-card" style={{ width: "18rem" }}>
              <img
                src="/images/placeholder.webp"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h4 className="card-title fw-bold">Antrenament de spate</h4>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <h5 className="card-text fw-bold">200 de lei</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
