import useCategories from "../../../hooks/useCategories";
import useBlogQueryStore from "../../../stores/blogQueryStore";
import BlogCategoriesSkeleton from "./BlogCategoriesSkeleton";
import CategoryListItem from "./CategoryListItem";

const BlogPostsCategories = () => {
  const { data: categories, error, isLoading } = useCategories();
  const setCategory = useBlogQueryStore((s) => s.setCategory);
  if (error) return null;
  if (isLoading) return <BlogCategoriesSkeleton />;

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <select
        className="form-select border-0 shadow d-md-none"
        id="categorySelect"
        name="category"
        onChange={(event) => setCategory(event.target.value)}
      >
        {categories?.result.map((doc) => (
          <option key={doc.id} value={doc.data().slug}>
            {doc.data().name}
          </option>
        ))}
      </select>

      <div
        className="card border-0 shadow d-none d-md-block"
        id="categorySelect"
      >
        <div className="card-header bg-primary text-light">
          <h4 className="card-title">Alege o categorie</h4>
        </div>
        <div className="card-body p-0">
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
