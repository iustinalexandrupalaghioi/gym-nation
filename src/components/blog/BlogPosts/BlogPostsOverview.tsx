import useFetchPosts from "../../../hooks/useFetchPosts";
import ErrorPage from "../../../pages/ErrorPage";
import BlogOverviewButtons from "./BlogOverviewButtons";
import BlogOverviewCard from "./BlogOverviewCard";

const BlogPostsOverview = () => {
  const { data: posts, error, isLoading } = useFetchPosts();

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
