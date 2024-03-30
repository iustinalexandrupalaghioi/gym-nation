import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { testimonials } from "../../data/testimonials";
import TestimonialCard from "./TestimonialCard";

function TestimonialCarousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="slider-container rounded-5">
      <Slider {...settings}>
        {testimonials.map((testiomonial, index) => (
          <TestimonialCard testimonial={testiomonial} key={index} />
        ))}
      </Slider>
    </div>
  );
}

export default TestimonialCarousel;
