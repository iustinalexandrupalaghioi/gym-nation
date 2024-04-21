import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { useEffect } from "react";
import useFetchPost from "../../../hooks/useFetchPost";

const BlogArticle = () => {
  const { slug } = useParams();
  const { data, error, isLoading } = useFetchPost("titleSlug", slug!);
  const post = data?.response.docs[0].data();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (error) return;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="col-12 col-md-8">
      <div className="mb-3 d-flex flex-column gap-2">
        <img
          src={post?.image}
          className="card-img-top rounded-2 shadow-lg"
          alt={post?.title}
        />
        <div className="card-body">
          <h3 className="card-title">{post?.title}</h3>
          <div className="d-inline-flex my-2 bg-primary rounded text-light px-3 py-2">
            <p className="mb-0 fs-xs">{post?.category.name}</p>
          </div>
          <p className="card-text">
            <small className="text-body-secondary">
              Postat la data de: {post?.createdAt}
            </small>
          </p>
          <div
            className="card-text"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post?.htmlContent),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
