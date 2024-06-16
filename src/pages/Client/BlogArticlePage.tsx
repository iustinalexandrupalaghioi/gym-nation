import BlogArticle from "../../components/blog/BlogPosts/BlogArticle";
import BlogPostsCategories from "../../components/blog/BlogPosts/BlogPostsCategories";
import ScrollToButton from "../../components/homepage/ScrollToButton";

const BlogArticlePage = () => {
  return (
    <div className="container py-5">
      <div className="row  mt-3">
        <BlogArticle />
        <BlogPostsCategories />
        <ScrollToButton sectionId="article" />
      </div>
    </div>
  );
};

export default BlogArticlePage;
