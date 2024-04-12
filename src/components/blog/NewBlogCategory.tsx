import { ChangeEvent } from "react";
import { categoriiArticole } from "../../data/blogs";

interface Props {
  setCategory: (event: ChangeEvent<HTMLSelectElement>) => void;
}
const NewBlogCategory = ({ setCategory }: Props) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor="category">Categorie</label>
      <select
        className="form-select"
        id="category"
        aria-label="Alege o categorie"
        onChange={setCategory}
      >
        <option value="">{"Alege o categorie din listă"}</option>
        {categoriiArticole.map(
          (option, index) =>
            option.slug !== "" && (
              <option key={index} value={option.slug}>
                {option.nume}
              </option>
            )
        )}
      </select>
    </div>
  );
};

export default NewBlogCategory;
