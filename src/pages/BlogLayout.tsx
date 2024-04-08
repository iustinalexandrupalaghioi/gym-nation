import { Outlet } from "react-router-dom";
import BlogPostsCategories from "../components/blog/BlogPostsCategories";
import BlogPostsGrid from "../components/blog/BlogPostsGrid";

const BlogLayout = () => {
  return (
    <BlogPostsGrid>
      <Outlet />
      <BlogPostsCategories />
    </BlogPostsGrid>
  );
};

export default BlogLayout;
