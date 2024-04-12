import React from "react";
import { Feature } from "../../data/features";

interface Props {
  feature: Feature;
}

const FeatureCard = ({ feature: { title, description, icon } }: Props) => {
  return (
    <div className="col d-flex flex-column gap-2 px-4">
      <div className="icon p-2 bg-primary d-flex justify-content-centr align-items-center text-light fs-4 rounded-3 shadow-sm">
        {React.createElement(icon)}
      </div>
      <h4 className="fw-semibold mb-0 text-body-emphasis fadeUp">{title}</h4>
      <p className="text-body-secondary">{description}</p>
    </div>
  );
};

export default FeatureCard;
