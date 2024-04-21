import useCategories from "../../../hooks/useCategories";
import CategoryListItem from "./CategoryListItem";

const BlogPostsCategories = () => {
  const { data: categories, error, isLoading } = useCategories();

  if (error) return null;
  if (isLoading) return <h1>Loading....</h1>;

  return (
    <div className="col-0 col-md-4 d-none d-md-block">
      <div className="card border-0 shadow">
        <div className="card-header bg-primary text-light">
          <h4 className="card-title">Alege o categorie</h4>
        </div>
        <div className="card-body">
          <ul className="list-unstyled d-flex flex-column">
            {categories?.result.map((doc) => (
              <CategoryListItem key={doc.id} doc={doc} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogPostsCategories;
