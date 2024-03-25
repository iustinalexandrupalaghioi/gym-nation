import { features } from "../data/features";

const Features = () => {
  return (
    <div className="container px-4 py-5 d-flex  flex-column align-items-center">
      <h2 className="pb-2 border-bottom">De ce să lucrezi cu noi?</h2>
      {features.map(({ id, title, description, image }) => (
        <div
          key={id}
          className={`card border-0 my-3 w-75 ${
            id % 2 === 0 ? "ms-5" : "me-5"
          }`}
        >
          <div
            className={`row align-items-center ${
              id % 2 === 0 && "flex-row-reverse"
            }`}
          >
            <div className={`col-md-4`}>
              <img src={image} className="img-fluid rounded-start" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="text-primary fw-bold">{title}</h5>
                <p className="card-text">{description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
