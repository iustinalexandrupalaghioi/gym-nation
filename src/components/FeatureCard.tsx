interface Props {
  feature: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
}
const FeatureCard = ({ feature: { id, title, description, image } }: Props) => {
  return (
    <div className="card border-0 mb-3" style={{ maxWidth: "960px" }}>
      <div
        className={`row align-items-center ${
          id % 2 === 0 && "flex-row-reverse"
        }`}
      >
        <div className="col-md-4">
          <img
            src={image}
            style={{ height: "220px" }}
            className="img-fluid rounded-start"
            alt={title}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="text-primary fw-bold">{title}</h5>
            <p className="card-text">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
