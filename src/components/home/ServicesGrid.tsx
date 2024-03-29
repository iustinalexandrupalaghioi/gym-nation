import React from "react";
import { services } from "../../data/services";
import ServicesCard from "./ServicesCard";
import ServicesModal from "./ServicesModal";

const ServicesGrid = () => {
  return (
    <section className="container px-4 py-5" id="services">
      <h2 className="pb-2 border-bottom text-center">Serviciile noastre</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 align-items-stretch g-4 py-5">
        {services.map((service, index) => (
          <React.Fragment key={index}>
            <ServicesCard service={service} />
            <ServicesModal service={service} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;
