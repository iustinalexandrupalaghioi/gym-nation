import { Service } from "../../data/services";
import "../../assets/styles/ServicesCard.css";

interface Props {
  service: Service;
}
const ServicesCard = ({ service: { id, title, img } }: Props) => {
  return (
    <div
      className="col"
      key={id}
      data-bs-toggle="modal"
      data-bs-target={`#modal-${id}`}
    >
      <div className="card card-cover h-100 overflow-hidden rounded-4 shadow-lg">
        <img src={img} />
        <div className="layer d-flex flex-column h-100 p-5 pb-3 text-light text-shadow-1">
          <h4 className="display-6 lh-1 fw-bold text-center px-2">{title}</h4>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
