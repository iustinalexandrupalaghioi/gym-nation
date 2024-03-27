import { services } from "../data/services";

const Services = () => {
  return (
    <div className="container px-4 py-5" id="custom-cards">
      <h2 className="pb-2 border-bottom">Serviciile noastre</h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 align-items-stretch g-4 py-5">
        {services.map(({ id, title, img }) => (
          <div className="col" key={id}>
            <div className="card  card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg antrenamente-col">
              <img src={img} />
              <div className="layer d-flex flex-column h-100 p-5 pb-3 text-light text-shadow-1">
                <h3 className="display-6 lh-1 fw-bold text-center">{title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
