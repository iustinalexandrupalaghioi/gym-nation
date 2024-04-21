import useFetchPostsBy from "../../../hooks/useFetchPostsBy";
import ErrorPage from "../../../pages/ErrorPage";
import useBlogQueryStore from "../../../utilities/blogQueryStore";
import BlogOverviewCard from "./BlogOverviewCard";
import BlogOverviewSkeleton from "./BlogOverviewSkeleton";

const BlogPostsOverview = () => {
  const categorySlug = useBlogQueryStore((s) => s.blogQuery.category);

  const {
    data: posts,
    error,
    isLoading,
  } = useFetchPostsBy("category.slug", categorySlug);

  const skeletons = [1, 2, 3, 4, 5];
  if (error) return <ErrorPage />;
  if (isLoading)
    return (
      <div className="col-12 col-md-8">
        {skeletons.map((skeleton) => (
          <BlogOverviewSkeleton key={skeleton} />
        ))}
      </div>
    );

  return (
    <div className="col-12 col-md-8">
      {posts?.result.map((doc) => (
        <BlogOverviewCard post={doc} key={doc.id} />
      ))}
    </div>
  );
};

export default BlogPostsOverview;
