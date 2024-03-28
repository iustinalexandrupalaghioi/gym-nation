import { Service } from "../data/services";

interface Props {
  service: Service;
}
const ServicesModal = ({ service: { id, title, description, img } }: Props) => {
  return (
    <div
      className="modal fade"
      id={`modal-${id}`}
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1
              className="modal-title fs-5 text-primary"
              id="exampleModalLabel"
            >
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row row-cols-1 mb-2 text-center">
              <img
                src={img}
                className="d-block img-fluid rounded-4"
                alt="Gym Nation representative picture"
                loading="lazy"
              />
            </div>
            <div className="row row-cols-1">
              <p className="lead">{description}</p>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary text-light"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesModal;
