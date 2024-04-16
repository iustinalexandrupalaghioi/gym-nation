import { Outlet } from "react-router-dom";
import BlogPostsCategories from "../components/blog/BlogPosts/BlogPostsCategories";
import BlogPostsGrid from "./BlogPostsPage";

const BlogLayout = () => {
  return (
    <BlogPostsGrid>
      <Outlet />
      <BlogPostsCategories />
    </BlogPostsGrid>
  );
};

export default BlogLayout;
