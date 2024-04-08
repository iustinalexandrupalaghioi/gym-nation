import BlogGrid from "../components/blog/BlogGrid";
import BlogPostsOverview from "../components/blog/BlogPostsOverview";
import BlogPostsCategories from "../components/blog/BlogPostsCategories";
import { posts } from "../data/blogs";

const Blog = () => {
  return (
    <BlogGrid>
      <BlogPostsOverview posts={posts} />
      <BlogPostsCategories />
    </BlogGrid>
  );
};

export default Blog;
