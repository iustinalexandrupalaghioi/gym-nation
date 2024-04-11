import { useParams } from "react-router-dom";
import useBlogPost from "../../hooks/useBlogPost";

const BlogArticle = () => {
  const { id } = useParams();
  const { data: post, error, isLoading } = useBlogPost(id!);
  if (error) return;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="col-12 col-md-8">
      <div className="mb-3 d-flex flex-column gap-2">
        <img
          src={post?.data()?.imageSource}
          className="card-img-top rounded-2 shadow-lg"
          alt={post?.data()?.blogTitle}
        />
        <div className="card-body">
          <h3 className="card-title">{post?.data()?.blogTitle}</h3>
          <p className="card-text">
            <small className="text-body-secondary">
              Postat la data de: {post?.data()?.createdAt}
            </small>
          </p>
          <div
            className="card-text"
            dangerouslySetInnerHTML={{ __html: post?.data()?.blogContent }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
