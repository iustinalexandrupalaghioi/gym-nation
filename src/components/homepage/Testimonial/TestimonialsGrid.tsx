import useTestimonials from "../../../hooks/useTestimonials";
import LoadingStatus from "../../LoadingStatus";
import TestimonialCard from "./TestimonialCard";
import TestimonialCarousel from "./TestimonialCarousel";

const TestimonialsGrid = () => {
  const { data: testimonials, isLoading, error } = useTestimonials();

  if (error)
    return (
      <div className="row py-4 d-flex justify-content-center">
        Nu există review-uri disponibile
      </div>
    );

  if (isLoading) return <LoadingStatus />;
  return (
    <div className="row py-4 d-flex justify-content-center">
      <TestimonialCarousel>
        {testimonials?.result.map((testiomonial, index) => (
          <TestimonialCard testimonial={testiomonial} key={index} />
        ))}
      </TestimonialCarousel>
    </div>
  );
};

export default TestimonialsGrid;
