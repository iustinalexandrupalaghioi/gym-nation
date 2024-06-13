import Service from "../../../entities/Service";

interface Props {
  service: Service;
  numberOfServices: number;
}
const ServicesModal = ({
  service: { id, title, description, img },
  numberOfServices,
}: Props) => {
  return (
    <div
      className="modal mt-0 fade"
      style={{ backdropFilter: "blur(4px)" }}
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
            <div className="col-lg-4">
              <img
                src={img}
                className="img-fluid rounded-2 shadow"
                alt={description}
              />
            </div>
            <div className="col-lg-8">
              <div className="card-body">
                <h3 className="card-title text-primary">{title}</h3>
                <p className="card-text fs-5">{description}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer justify-content-between">
            <button
              type="button"
              className="btn btn-outline-primary btnOutline"
              data-bs-target={`#modal-${
                id - 1 < 1 ? numberOfServices - 1 : id - 1
              }`}
              data-bs-toggle="modal"
            >
              Înapoi
            </button>

            <button
              className="btn btn-primary text-light"
              data-bs-target={`#modal-${
                id + 1 <= numberOfServices - 1 ? id + 1 : 1
              }`}
              data-bs-toggle="modal"
            >
              Următorul
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesModal;
