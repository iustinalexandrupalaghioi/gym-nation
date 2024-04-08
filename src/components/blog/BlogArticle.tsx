import { BlogPost } from "../../data/blogs";

interface Props {
  post: BlogPost;
}
const BlogArticle = ({
  post: { id, title, content, createdAt, img },
}: Props) => {
  return (
    <div className="col-12 col-md-8">
      <div key={id} className="card mb-3">
        <div className="row g-0 justify-content-between">
          <div className="col-12 col-lg-8">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">
                <small className="text-body-secondary">{createdAt}</small>
              </p>
              <p className="card-text">{content}</p>
            </div>
          </div>

          <div className="col-lg-4">
            <img src={img} className="h-100 w-100 rounded-end" alt={title} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
