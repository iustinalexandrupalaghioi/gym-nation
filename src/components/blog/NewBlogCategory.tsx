import { categoriiArticole } from "../../data/blogs";

interface Props {
  category: string;
}
const NewBlogCategory = ({ category }: Props) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor="category">Categorie</label>
      <select
        className="form-select"
        id="category"
        aria-label="Alege o categorie"
        value={category}
      >
        <option selected>Alege o categorie din listă</option>
        {categoriiArticole.map(
          (category, index) =>
            category.slug !== "" && (
              <option key={index} value={category.slug}>
                {category.nume}
              </option>
            )
        )}
      </select>
    </div>
  );
};

export default NewBlogCategory;
