import BlogPostsCategories from "../components/blog/BlogPostsCategories";
import BlogArticle from "../components/blog/BlogArticle";

const BlogArticlePage = () => {
  return (
    <div className="container py-5">
      <div className="row mt-3">
        <BlogArticle />
        <BlogPostsCategories />
      </div>
    </div>
  );
};

export default BlogArticlePage;
