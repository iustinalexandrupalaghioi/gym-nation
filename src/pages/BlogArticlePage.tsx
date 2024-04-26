import BlogPostsCategories from "../components/blog/BlogPosts/BlogPostsCategories";
import BlogArticle from "../components/blog/BlogPosts/BlogArticle";

const BlogArticlePage = () => {
  return (
    <div className="container py-5">
      <div className="row  mt-3">
        <BlogArticle />
        <BlogPostsCategories />
      </div>
    </div>
  );
};

export default BlogArticlePage;
