import { ChangeEvent } from "react";

interface Props {
  title: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const NewBlogTitle = ({ title, handleChange }: Props) => {
  return (
    <div className="form-floating">
      <input
        id="title"
        type="text"
        className="form-control"
        placeholder="Scrie un titlu pentru postarea ta"
        value={title}
        onChange={handleChange}
      />
      <label htmlFor="title">Titlul articolului</label>
    </div>
  );
};

export default NewBlogTitle;
