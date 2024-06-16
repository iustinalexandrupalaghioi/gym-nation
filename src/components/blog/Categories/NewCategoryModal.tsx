import { ChangeEvent, FormEvent, useState } from "react";
import slugify from "slugify";
import FirebaseClient from "../../../utilities/firebase-client";
import useCategories from "../../../hooks/useCategories";
import { queryClient } from "../../../main";
import ToggleModalButton from "../../dashboard/ToggleModalButton";
import Modal from "../../dashboard/Modal";

const firebaseClient = new FirebaseClient("/categories");

const NewCategoryModal = () => {
  const [category, setCategory] = useState<string>("");
  const [isActive, setActive] = useState(false);

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
    <>
      <ToggleModalButton
        isActive={isActive}
        setActive={setActive}
        textContent="Adaugă Categorie"
        modalId="newCategoryModal"
      />

      <Modal
        modalId="newCategoryModal"
        modalTitle="Adaugă o Categorie Nouă"
        handleSubmit={handleSubmit}
        setActive={setActive}
      >
        <div className="form-group mb-3">
          <label className="text-body-secondary" htmlFor="newCategory">
            Denumire:
          </label>
          <input
            value={category}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setCategory(event.target.value)
            }
            type="text"
            className="form-control border-0"
            id="newCategory"
            placeholder="ex: Sport de performanță"
          />
        </div>
      </Modal>
    </>
  );
};

export default NewCategoryModal;
