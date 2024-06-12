import useCategories from "../../../hooks/useCategories";
import BlogCategoriesSkeleton from "./BlogCategoriesSkeleton";
import CategoryListItem from "./CategoryListItem";

const BlogPostsCategories = () => {
  const { data: categories, error, isLoading } = useCategories();

  if (error) return null;
  if (isLoading) return <BlogCategoriesSkeleton />;

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card border-0 shadow position-fixed w-25">
        <div className="card-header bg-primary text-light">
          <h4 className="card-title">Alege o categorie</h4>
        </div>
        <div className="card-body px-0">
          <ul className="list-group">
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
