import useCategories from "../../../hooks/useCategories";
import useBlogQueryStore from "../../../utilities/blogQueryStore";

const BlogPostsCategories = () => {
  const setCategory = useBlogQueryStore((s) => s.setCategory);
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
            {categories?.map((doc) => (
              <li
                key={doc.id}
                className="d-flex justify-content-between align-items-center"
              >
                <button
                  className="nav-link"
                  onClick={() => setCategory(doc.data().slug)}
                >
                  {doc.data().name}
                </button>
                <p className="text-primary fw-bold">21</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogPostsCategories;
