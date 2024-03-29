import { Testimonial } from "../data/testimonials";
import { FaStar } from "react-icons/fa";

interface Props {
  testimonial: Testimonial;
}
const TestimonialCard = ({
  testimonial: { id, name, content, img, stars },
}: Props) => {
  const array = [];
  for (let i = 0; i < stars; i++) {
    array[i] = i;
  }
  return (
    <div className="col">
      <div
        className="card d-flex border-0 shadow-lg h-100 mb-3"
        id={`testimonial-${id}`}
      >
        <div className="card-header d-flex gap-2 align-items-center">
          <img
            src={img}
            className="rounded-circle img-fluid"
            alt={`picture with ${name}`}
            style={{ width: "70px", height: "70px" }}
          />
          <div className="author d-flex flex-column justify-content-center">
            <h5 className="card-title">{name}</h5>
            <div className="d-flex">
              {array.map((star) => (
                <p key={star} className="text-primary">
                  <FaStar />
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
