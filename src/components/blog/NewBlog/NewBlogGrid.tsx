import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const NewBlogGrid = ({ children }: Props) => {
  return <div className="container px-4 py-5 vh-100">{children}</div>;
};

export default NewBlogGrid;
