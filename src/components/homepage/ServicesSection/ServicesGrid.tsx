import React from "react";
import services from "../../../data/services";
import ServicesCard from "./ServicesCard";
import ServicesModal from "./ServicesModal";

const ServicesGrid = () => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 align-items-stretch g-4 py-5">
      {services.map((service, index) => (
        <React.Fragment key={index}>
          <ServicesCard service={service} />
          <ServicesModal service={service} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default ServicesGrid;
