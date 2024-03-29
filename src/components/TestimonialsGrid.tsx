import { testimonials } from "../data/testimonials";
import TestimonialCard from "./TestimonialCard";

const TestimonialsGrid = () => {
  return (
    <section className="container px-4 py-5" id="testimonials">
      <h2 className="pb-2 border-bottom text-center">Clienți fericiți</h2>
      <div className="testimonial-row row row-cols-md-2  g-3 py-5 px-4">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsGrid;
