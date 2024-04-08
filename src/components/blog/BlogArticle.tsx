import { useParams } from "react-router-dom";
import { posts } from "../../data/blogs";

const BlogArticle = () => {
  const { id } = useParams();
  const article = posts.find((post) => post.id == parseInt(id!));

  return (
    <div className="col-12 col-md-8">
      <div className="mb-3 d-flex flex-column gap-2">
        <img src={article?.img} className="card-img-top" alt={article?.title} />
        <div className="card-body">
          <h3 className="card-title">{article?.title}</h3>
          <p className="card-text">
            <small className="text-body-secondary">
              Postat la data de: {article?.createdAt}
            </small>
          </p>
          <p className="card-text">{article?.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
