import { FaStar, FaRegStar } from "react-icons/fa";
import { Testimonial } from "../../data/testimonials";
import getRating from "../../utilities/getRating";

interface Props {
  testimonial: Testimonial;
}
const TestimonialCard = ({
  testimonial: { id, name, content, img, stars },
}: Props) => {
  const { regStars, starNumber } = getRating(stars);
  return (
    <div
      className="card h-100 p-4 rounded-4 border-0 shadow d-flex flex-column justify-content-between"
      id={`testimonial-${id}`}
    >
      <p className="">{content}</p>
      <div className=" d-flex gap-2 align-items-center">
        <img
          src={img}
          className="rounded-circle"
          alt={`picture with ${name}`}
          style={{ width: "70px", height: "70px" }}
        />

        <div className="author d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <div className="d-flex">
            <p className="text-primary">
              {starNumber.map((star) => (
                <FaStar key={star} />
              ))}
              {regStars.map((star) => (
                <FaRegStar key={star} />
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
