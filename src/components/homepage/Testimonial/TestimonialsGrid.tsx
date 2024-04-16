import testimonials from "../../../data/testimonials";
import TestimonialCard from "./TestimonialCard";
import TestimonialCarousel from "./TestimonialCarousel";

const TestimonialsGrid = () => {
  return (
    <div className="row py-4 d-flex justify-content-center">
      <TestimonialCarousel>
        {testimonials.map((testiomonial, index) => (
          <TestimonialCard testimonial={testiomonial} key={index} />
        ))}
      </TestimonialCarousel>
    </div>
  );
};

export default TestimonialsGrid;
