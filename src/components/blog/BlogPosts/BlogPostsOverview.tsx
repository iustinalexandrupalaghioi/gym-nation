import useFetchPosts from "../../../hooks/useFetchPosts";
import useFetchPostsBy from "../../../hooks/useFetchPostsBy";
import ErrorPage from "../../../pages/ErrorPage";
import useBlogQueryStore from "../../../utilities/blogQueryStore";
import BlogOverviewButtons from "./BlogOverviewButtons";
import BlogOverviewCard from "./BlogOverviewCard";

const BlogPostsOverview = () => {
  const categorySlug = useBlogQueryStore((s) => s.blogQuery.category);

  const {
    data: posts,
    error,
    isLoading,
  } = useFetchPostsBy("category.slug", categorySlug);

  if (error) return <ErrorPage />;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="col-12 col-md-8">
      {posts?.result.map((doc) => (
        <BlogOverviewCard post={doc} key={doc.id} />
      ))}
      <BlogOverviewButtons />
    </div>
  );
};

export default BlogPostsOverview;
