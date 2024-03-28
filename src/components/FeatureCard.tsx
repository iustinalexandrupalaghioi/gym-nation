import React from "react";
import { Feature } from "../data/features";

interface Props {
  feature: Feature;
}

const FeatureCard = ({ feature: { id, title, description, icon } }: Props) => {
  return (
    <div key={id} className="col d-flex flex-column gap-2">
      <div className="icon p-2 bg-primary text-light text-center fs-4 rounded-3">
        {React.createElement(icon)}
      </div>
      <h4 className="fw-semibold mb-0 text-body-emphasis">{title}</h4>
      <p className="text-body-secondary">{description}</p>
    </div>
  );
};

export default FeatureCard;
