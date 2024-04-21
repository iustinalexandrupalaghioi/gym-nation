import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { useEffect } from "react";

import usePost from "../../../hooks/usePost";

const BlogArticle = () => {
  const { slug } = useParams();
  const post = usePost(slug!);
  const data = post?.data();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="col-12 col-md-8">
      <div className="mb-3 d-flex flex-column gap-2">
        <img
          src={data?.image}
          className="card-img-top rounded-2 shadow-lg"
          alt={data?.title}
        />
        <div className="card-body">
          <h3 className="card-title">{data?.title}</h3>
          <div className="d-inline-flex my-2 bg-primary rounded text-light px-3 py-2">
            <p className="mb-0 fs-xs">{data?.category.name}</p>
          </div>
          <p className="card-text">
            <small className="text-body-secondary">
              Postat la data de: {data?.createdAt}
            </small>
          </p>
          <div
            className="card-text"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data?.htmlContent),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
