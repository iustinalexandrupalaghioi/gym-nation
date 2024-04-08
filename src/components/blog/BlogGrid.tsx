import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const BlogGrid = ({ children }: Props) => {
  return (
    <div className="container">
      <div className="row mt-5">{children}</div>
    </div>
  );
};

export default BlogGrid;
