import { Link } from "react-router-dom";
import { BlogPost } from "../../data/blogs";

interface Props {
  posts: BlogPost[];
}
const BlogPostsOverview = ({ posts }: Props) => {
  return (
    <div className="col-12 col-md-8">
      {posts.map(({ id, title, img, createdAt, content }) => (
        <div key={id} className="card mb-3">
          <div className="row g-0 justify-content-between">
            <div className="col-12 col-lg-8">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                  <small className="text-body-secondary">{createdAt}</small>
                </p>
                <p className="card-text">{content.substring(0, 70)}...</p>
                <Link to={`/:${id}`}>Citește articolul {">>"}</Link>
              </div>
            </div>

            <div className="col-lg-4">
              <img src={img} className="h-100 w-100 rounded-end" alt={title} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPostsOverview;
