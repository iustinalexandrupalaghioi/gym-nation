import { FormEvent, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const NewItemForm = ({ children }: Props) => {
  return (
    <div className="container px-4 py-5 vh-100">
      <form
        className="form card border-0 shadow p-4 rounded-4"
        onSubmit={(event: FormEvent<HTMLFormElement>) => event.preventDefault()}
      >
        {children}
      </form>
    </div>
  );
};

export default NewItemForm;
