import { DocumentData } from "firebase/firestore";
import { Link } from "react-router-dom";

interface Props {
  post: DocumentData;
}
const BlogOverviewCard = ({ post }: Props) => {
  return (
    <div className="card border-0 rounded-4 shadow mb-5">
      <div className="row g-0 justify-content-between">
        <div className="col-12 col-lg-8">
          <div className="card-body">
            <h5 className="card-title">{post.data().title}</h5>
            <p className="card-text mb-0">
              <small className="text-body-secondary">
                Postat la data de: {post.data().createdAt}
              </small>
            </p>
            <div className="d-inline-flex my-2 bg-primary rounded text-light px-3 py-2">
              <p className="mb-0 fs-xs">{post.data().category.name}</p>
            </div>
            <p className="card-text">
              {post.data().textContent.substring(0, 200)}...
            </p>

            <Link to={`/blog/${post.data().titleSlug}`}>
              Citește articolul {">>"}
            </Link>
          </div>
        </div>

        <div className="col-lg-4 d-flex align-items-center">
          <img
            src={post.data().image}
            className="img-fluid rounded-4 pe-md-2"
            alt={post.data().title}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogOverviewCard;
