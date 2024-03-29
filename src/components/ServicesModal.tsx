import { Service } from "../data/services";

interface Props {
  service: Service;
}
const ServicesModal = ({ service: { id, title, description, img } }: Props) => {
  return (
    <div
      className="modal custom-modal fade"
      id={`modal-${id}`}
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Gym Nation România
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body row g-3">
            <div className="col-md-4">
              <img
                src={img}
                className="img-fluid rounded-2"
                alt={description}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title text-primary">{title}</h3>
                <p className="card-text fs-5">{description}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary text-light"
              data-bs-dismiss="modal"
            >
              Înapoi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesModal;
