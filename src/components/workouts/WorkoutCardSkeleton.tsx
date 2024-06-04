const WorkoutCardSkeleton = () => {
  return (
    <div className="col mb-5 mb-xl-0">
      <div className="card workout-card w-100 h-100">
        <img
          src="/images/placeholder.webp"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5>
            <span className="placeholder text-primary col-8"></span>
          </h5>
          <p className="card-text">
            <span className="placeholder col-8"></span>
            <span className="placeholder col-10"></span>
            <span className="placeholder col-12"></span>
          </p>
          <h5 className="card-text fw-bold">
            <span className="placeholder text-primary col-3 me-2"></span>
            <span className="placeholder col-6"></span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCardSkeleton;
