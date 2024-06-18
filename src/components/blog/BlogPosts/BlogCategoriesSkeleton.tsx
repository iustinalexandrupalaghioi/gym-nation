const BlogCategoriesSkeleton = () => {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card bg-body-tertiary border-0 shadow">
        <div className="card-header bg-primary text-light">
          <h4 className="card-title placeholder-glow">
            <span className="placeholder col-8"></span>
          </h4>
        </div>
        <div className="card-body">
          <ul className="list-unstyled d-flex flex-column gap-3`">
            <li className="d-flex justify-content-between mb-3">
              <span className="placeholder glow col-6"></span>
              <a className=" disabled placeholder col-1"></a>
            </li>
            <li className="d-flex justify-content-between mb-3">
              <span className="placeholder glow col-7"></span>
              <a className=" disabled placeholder col-1"></a>
            </li>
            <li className="d-flex justify-content-between mb-3">
              <span className="placeholder glow col-8"></span>
              <a className=" disabled placeholder col-1"></a>
            </li>
            <li className="d-flex justify-content-between mb-3">
              <span className="placeholder glow col-5"></span>
              <a className=" disabled placeholder col-1"></a>
            </li>
            <li className="d-flex justify-content-between mb-3">
              <span className="placeholder glow col-7"></span>
              <a className=" disabled placeholder col-1"></a>
            </li>
            <li className="d-flex justify-content-between mb-3">
              <span className="placeholder glow col-6"></span>
              <a className=" disabled placeholder col-1"></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogCategoriesSkeleton;
