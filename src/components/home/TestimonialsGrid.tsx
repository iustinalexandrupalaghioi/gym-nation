import TestimonialCarousel from "./TestimonialCarousel";

const TestimonialsGrid = () => {
  return (
    <section className="container py-5" id="testimonials">
      <h2 className="pb-2 border-bottom text-center">Clienți fericiți</h2>
      <div className="row py-4 d-flex justify-content-center">
        <TestimonialCarousel />
      </div>
    </section>
  );
};

export default TestimonialsGrid;
