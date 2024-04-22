import { ChangeEvent } from "react";
import useCategories from "../../../hooks/useCategories";

interface Props {
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}
const NewBlogCategory = ({ handleChange }: Props) => {
  const { data: categories } = useCategories();

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
        {categories?.result.map(
          (option, index) =>
            option.data().slug !== "" && (
              <option key={index} value={option.data().slug}>
                {option.data().name}
              </option>
            )
        )}
      </select>
    </div>
  );
};

export default NewBlogCategory;
