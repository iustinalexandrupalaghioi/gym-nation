import { Outlet } from "react-router-dom";
import BlogGrid from "../components/blog/BlogGrid";
import BlogPostsCategories from "../components/blog/BlogPostsCategories";

const BlogLayout = () => {
  return (
    <BlogGrid>
      <Outlet />
      <BlogPostsCategories />
    </BlogGrid>
  );
};

export default BlogLayout;
