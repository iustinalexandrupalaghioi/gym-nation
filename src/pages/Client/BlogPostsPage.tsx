import BlogPostsCategories from "../../components/blog/BlogPosts/BlogPostsCategories";
import BlogPostsOverview from "../../components/blog/BlogPosts/BlogPostsOverview";

const BlogPostsPage = () => {
  return (
    <div className="container py-5">
      <div className="row flex-md-row-reverse mt-3 gap-4 gap-md-0">
        <BlogPostsCategories />
        <BlogPostsOverview />
      </div>
    </div>
  );
};

export default BlogPostsPage;
