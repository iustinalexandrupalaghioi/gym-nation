import TestimonialCard from "./TestimonialCard";
import { testimonials } from "../../data/testimonials";
import { useState } from "react";

const TestimonialsGrid = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Initially set the first element as active

  const handleSetActive = (index: number) => {
    setActiveIndex(index);
  };

  const rows = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    rows.push(testimonials.slice(i, i + 2));
  }

  return (
    <section className="container px-4 py-5" id="testimonials">
      <h2 className="pb-2 border-bottom text-center">Clienți fericiți</h2>

      <div
        id="testimonialsCarousel"
        className="carousel carousel-dark slide py-4"
      >
        <div className="row">
          <div className="carousel-inner">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`carousel-item ${rowIndex === 0 ? "active" : ""}`}
              >
                <div className="row row-cols-1">
                  {row.map((testimonial, colIndex) => (
                    <div key={colIndex} className="col-12 col-md-6">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="carousel-control-prev pe-5"
          type="button"
          data-bs-target="#testimonialsCarousel"
          data-bs-slide="prev"
          onClick={() =>
            handleSetActive(
              activeIndex === 0 ? rows.length - 1 : activeIndex - 1
            )
          }
        >
          <span
            className="carousel-control-prev-icon pe-5"
            aria-hidden="true"
          ></span>
        </button>
        <button
          className="carousel-control-next ps-5"
          type="button"
          data-bs-target="#testimonialsCarousel"
          data-bs-slide="next"
          onClick={() => handleSetActive(activeIndex + 1)}
        >
          <span
            className="carousel-control-next-icon ps-5"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </section>
  );
};

export default TestimonialsGrid;
