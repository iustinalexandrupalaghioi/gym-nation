import { ChangeEvent, FormEvent, useState } from "react";
import slugify from "slugify";
import FirebaseClient from "../../../utilities/firebase-client";
import useCategories from "../../../hooks/useCategories";
import { queryClient } from "../../../main";

interface Props {
  isActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const firebaseClient = new FirebaseClient("/categories");

const NewCategoryModal = ({ setActive }: Props) => {
  const [category, setCategory] = useState<string>("");
  const { data: categories } = useCategories();

  const newId = categories?.result ? categories.result.length : 999;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let categorySlug = slugify(category, {
      replacement: "-",
      lower: true,
    });
    try {
      await firebaseClient.post(
        { name: category, slug: categorySlug },
        newId.toString()
      );
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      setCategory("");
      alert("Categoria a fost adaugata cu succes!");
    } catch (error: any) {
      alert("Eroare la adaugarea noii categorii.");
    }
  };

  return (
    <div
      className="modal fade"
      id="newCategoryModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form
            onSubmit={(event: FormEvent<HTMLFormElement>) =>
              handleSubmit(event)
            }
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Adaugă o Categorie Nouă
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setActive(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group mb-3">
                <label htmlFor="newCategory">Denumire:</label>
                <input
                  value={category}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setCategory(event.target.value)
                  }
                  type="text"
                  className="form-control"
                  id="newCategory"
                  placeholder="ex: Sport de performanță"
                />
              </div>
            </div>
            <div className="modal-footer d-flex align-items-end gap-1">
              <button
                type="button"
                className="btn btn-outline-info"
                data-bs-dismiss="modal"
                onClick={() => setActive(false)}
              >
                Anulează
              </button>
              <button type="submit" className="btn btn-primary text-light">
                Adaugă
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCategoryModal;
