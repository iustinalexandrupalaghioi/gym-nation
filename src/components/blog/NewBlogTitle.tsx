import { ChangeEvent } from "react";

interface Props {
  title: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const NewBlogTitle = ({ title, handleChange }: Props) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor="title">Titlul articolului</label>
      <input
        id="title"
        type="text"
        className="form-control"
        placeholder="Scrie un titlu pentru postarea ta"
        value={title}
        onChange={handleChange}
      />
    </div>
  );
};

export default NewBlogTitle;
