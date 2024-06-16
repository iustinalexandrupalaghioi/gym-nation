import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import usePost from "../../../hooks/usePost";
import { useEffect } from "react";

const BlogArticle = () => {
  const { slug } = useParams();

  const { data: posts, isLoading } = usePost("titleSlug", slug!);
  const article = posts?.result?.[0].data()!;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="col-12 col-md-8">
      {isLoading ? (
        <div className="text-center vh-100 d-flex align-items-center justify-content-center">
          <div className="spinner-border" role="status">
            <span>Loading...</span>
          </div>
        </div>
      ) : (
        <div className="mb-3 d-flex flex-column gap-2" id="article">
          <img
            src={article?.image}
            className="card-img-top rounded-2 shadow-lg mb-2 w-100 h-50"
            alt={article?.title}
          />
          <div className="card-body">
            <h3 className="card-title mb-2">{article?.title}</h3>
            <div className="d-inline-flex my-2 bg-primary rounded text-light px-3 py-2 mb-2">
              <p className="mb-0 fs-xs">{article?.category.name}</p>
            </div>
            <p className="card-text">
              <small className="text-body-secondary">
                Postat: {article?.createdAt}
              </small>
            </p>
            <div
              className="card-text"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article?.htmlContent),
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogArticle;
