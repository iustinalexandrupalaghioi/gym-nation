import { useParams } from "react-router-dom";
import useBlogPost from "../../hooks/useBlogPost";
import DOMPurify from "dompurify";

const BlogArticle = () => {
  const { id } = useParams();
  const { data: post, error, isLoading } = useBlogPost(id!);
  if (error) return;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="col-12 col-md-8">
      <div className="mb-3 d-flex flex-column gap-2">
        <img
          src={post?.data()?.image}
          className="card-img-top rounded-2 shadow-lg"
          alt={post?.data()?.title}
        />
        <div className="card-body">
          <h3 className="card-title">{post?.data()?.title}</h3>
          <div className="d-inline-flex my-2 bg-primary rounded text-light px-3 py-2">
            <p className="mb-0 fs-xs">{post?.data()?.category.name}</p>
          </div>
          <p className="card-text">
            <small className="text-body-secondary">
              Postat la data de: {post?.data()?.createdAt}
            </small>
          </p>
          <div
            className="card-text"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post?.data()?.htmlContent),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
