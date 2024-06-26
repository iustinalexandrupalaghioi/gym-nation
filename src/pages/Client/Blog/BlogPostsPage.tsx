import BlogPostsCategories from "../../../components/blog/BlogPosts/BlogPostsCategories";
import BlogPostsOverview from "../../../components/blog/BlogPosts/BlogPostsOverview";
import ScrollToButton from "../../../components/homepage/ScrollToButton";

const BlogPostsPage = () => {
  return (
    <div className="container py-5">
      <div className="row flex-md-row-reverse mt-3 gap-4 gap-md-0">
        <BlogPostsCategories />
        <BlogPostsOverview />
        <ScrollToButton sectionId="top" />
      </div>
    </div>
  );
};

export default BlogPostsPage;
