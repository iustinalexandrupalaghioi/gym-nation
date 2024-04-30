import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const NewBlogGrid = ({ children }: Props) => {
  return (
    <div className="container px-4 py-5 vh-100">
      <form className="form card border-0 shadow p-4 rounded-4">
        {children}
      </form>
    </div>
  );
};

export default NewBlogGrid;
