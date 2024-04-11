import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}
const BlogPostsGrid = ({ children }: Props) => {
  return (
    <div className="container py-5">
      <Link className="btn btn-primary text-light" to="/blog/new">
        New Post
      </Link>
      <div className="row mt-3">{children}</div>
    </div>
  );
};

export default BlogPostsGrid;
