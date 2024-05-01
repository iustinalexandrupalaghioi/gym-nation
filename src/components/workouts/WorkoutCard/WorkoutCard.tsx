import "./workout-card.css";
const WorkoutCard = () => {
  return (
    <div className="card workout-card" style={{ width: "18rem" }}>
      <img src="/images/placeholder.webp" className="card-img-top" alt="..." />
      <div className="card-body">
        <h4 className="card-title fw-bold">Antrenament de spate</h4>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <h5 className="card-text fw-bold">200 de lei</h5>
      </div>
    </div>
  );
};

export default WorkoutCard;
