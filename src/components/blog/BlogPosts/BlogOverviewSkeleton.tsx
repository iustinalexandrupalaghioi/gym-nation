import placeholder from "/images/placeholder.webp";
const BlogOverviewSkeleton = () => {
  return (
    <div
      className="card bg-body-tertiary border-0 rounded-4 shadow mb-5"
      aria-hidden="true"
    >
      <div className="row g-0 justify-content-between">
        <div className="col-lg-4 d-flex align-items-center">
          <img src={placeholder} className="img-fluid rounded-4" alt="..." />
        </div>
        <div className="col-12 col-md-6 col-lg-8">
          <div className="card-body">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-8"></span>
            </h5>
            <p className="card-text mb-0 placeholder-glow">
              <span className="placeholder col-4"></span>
            </p>
            <div className="d-inline-flex my-2 bg-primary disabled placeholder col-3 px-3 py-2"></div>
            <p className="card-text">
              <span className="placeholder col-8"></span>
              <span className="placeholder col-10"></span>
              <span className="placeholder col-12"></span>
              <span className="placeholder col-10"></span>
              <span className="placeholder col-9"></span>
            </p>

            <a className=" disabled placeholder col-3"></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogOverviewSkeleton;
