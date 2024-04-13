import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";

interface Props {
  doc: DocumentData;
}
const BlogOverviewCard = ({ doc }: Props) => {
  return (
    <div className="card border-0 rounded-4 shadow mb-5">
      <div className="row g-0 justify-content-between">
        <div className="col-12 col-lg-8">
          <div className="card-body">
            <h5 className="card-title">{doc.data().title}</h5>
            <p className="card-text mb-0">
              <small className="text-body-secondary">
                Postat la data de: {doc.data().createdAt}
              </small>
            </p>
            <div className="d-inline-flex my-2 bg-primary rounded text-light px-3 py-2">
              <p className="mb-0 fs-xs">{doc.data().category.name}</p>
            </div>
            <p className="card-text">
              {doc.data().textContent.substring(0, 200)}...
            </p>

            <Link to={`/blog/${doc.id}`}>Citește articolul {">>"}</Link>
          </div>
        </div>

        <div className="col-lg-4 d-flex align-items-center">
          <img
            src={doc.data().image}
            className="img-fluid rounded-4 pe-md-2"
            alt={doc.data().title}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogOverviewCard;
