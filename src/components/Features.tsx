import React from "react";
import { features } from "../data/features";

const Features = () => {
  return (
    <section className="container px-4 py-5">
      <h2 className="pb-2 border-bottom">De ce să lucrezi cu noi?</h2>

      <div className="row row-cols-1 align-items-md-start g-5 py-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
          {features.map(({ id, title, description, icon }) => (
            <div key={id} className="col d-flex flex-column gap-2">
              <div className="icon p-2 d-inline-flex align-items-center justify-content-center bg-primary text-light bg-gradient fs-4 rounded-3">
                <svg className="bi" width="1em" height="1em">
                  {React.createElement(icon)}
                </svg>
              </div>
              <h4 className="fw-semibold mb-0 text-body-emphasis">{title}</h4>
              <p className="text-body-secondary">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
