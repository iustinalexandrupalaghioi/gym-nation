import { Link } from "react-router-dom";
import { categoriiArticole } from "../../data/blogs";

const BlogPostsCategories = () => {
  return (
    <div className="col-0 col-md-4 d-none d-md-block">
      <div className="card border-0 shadow">
        <div className="card-header bg-primary text-light">
          <h4 className="card-title">Alege o categorie</h4>
        </div>
        <div className="card-body">
          <ul className="list-unstyled d-flex flex-column">
            {categoriiArticole.map((category, index) => (
              <li
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                <Link to={`/blog/${category.slug}`} className="nav-link active">
                  {category.name}
                </Link>
                <p className="text-primary fw-bold">
                  {category.titluri.length}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogPostsCategories;
