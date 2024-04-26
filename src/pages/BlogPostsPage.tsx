import { Link } from "react-router-dom";
import BlogPostsOverview from "../components/blog/BlogPosts/BlogPostsOverview";
import BlogPostsCategories from "../components/blog/BlogPosts/BlogPostsCategories";

const BlogPostsPage = () => {
  return (
    <div className="container py-5">
      <Link className="btn btn-primary text-light" to="/blog/new">
        New Post
      </Link>
      <div className="row flex-md-row-reverse mt-3">
        <BlogPostsCategories />
        <BlogPostsOverview />
      </div>
    </div>
  );
};

export default BlogPostsPage;
