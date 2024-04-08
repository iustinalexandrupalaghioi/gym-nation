import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}
const BlogPostsGrid = ({ children }: Props) => {
  return (
    <div className="container px-4 py-5">
      <Link className="btn btn-primary text-light" to="/blog/new">
        New Post
      </Link>
      <div className="row mt-5">{children}</div>
    </div>
  );
};

export default BlogPostsGrid;
