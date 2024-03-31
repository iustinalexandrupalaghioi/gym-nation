import { ReactNode } from "react";
import { settings } from "../../data/carousel-settings";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/styles/TestimonialCarousel.css";

interface Props {
  children: ReactNode;
}

function TestimonialCarousel({ children }: Props) {
  return (
    <div className="slider-container rounded-5">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}

export default TestimonialCarousel;
