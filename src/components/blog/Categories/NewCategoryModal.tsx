import { useState } from "react";
import slugify from "slugify";
import FirebaseClient from "../../../utilities/firebase-client";
import useCategories from "../../../hooks/useCategories";
import { queryClient } from "../../../main";
import ToggleModalButton from "../../dashboard/ToggleModalButton";
import Modal from "../../dashboard/Modal";
import showToast, { Method } from "../../../utilities/showToast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";

const firebaseClient = new FirebaseClient("/categories");
const schema = z.object({
  category: z.string().min(5, {
    message: "O categorie ar trebui să aibă cel puțin 5 caractere.",
  }),
});

type FormData = z.infer<typeof schema>;
const NewCategoryModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [isActive, setActive] = useState(false);

  const { data: categories } = useCategories();

  const newId = categories?.result ? categories.result.length : 999;

  const onSubmit = async (data: FieldValues) => {
    const category = data.category;
    let categorySlug = slugify(category, {
      replacement: "-",
      lower: true,
    });
    try {
      await firebaseClient.post(
        { name: category, slug: categorySlug },
        newId.toString()
      );
      showToast("Categoria a fost adaugata cu succes!", Method.Success);
    } catch (error: any) {
      showToast("Eroare la adaugarea noii categorii.", Method.Error);
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
        setActive={setActive}
      >
        <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3">
            <label className="text-body-secondary" htmlFor="newCategory">
              Denumire:
            </label>
            <input
              {...register("category")}
              type="text"
              className="form-control border-0"
              id="newCategory"
              placeholder="ex: Sport de performanță"
            />
            {errors.category && (
              <p className="text-danger">{errors.category?.message}</p>
            )}
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
      </Modal>
    </>
  );
};

export default NewCategoryModal;
