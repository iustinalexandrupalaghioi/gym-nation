import { ChangeEvent } from "react";
import categoriiArticole from "../../../data/blogs";

interface Props {
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}
const NewBlogCategory = ({ handleChange }: Props) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor="category">Categorie</label>
      <select
        className="form-select"
        id="category"
        name="category"
        aria-label="Alege o categorie"
        onChange={handleChange}
      >
        <option value="">{"Alege o categorie din listă"}</option>
        {categoriiArticole.map(
          (option, index) =>
            option.slug !== "" && (
              <option key={index} value={option.slug}>
                {option.name}
              </option>
            )
        )}
      </select>
    </div>
  );
};

export default NewBlogCategory;
