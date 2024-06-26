import slugify from "slugify";
import FirebaseClient from "../../utilities/firebase-client";
import ToggleModalButton from "../dashboard/ToggleModalButton";
import Modal from "../dashboard/Modal";
import showToast, { Method } from "../../utilities/showToast";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { queryClient } from "../../main";
import LoadingButton from "../account/LoadingButton";
import useCategories from "../../hooks/Blog/useCategories";

const schema = z.object({
  category: z.string().min(5, {
    message: "O categorie ar trebui să aibă cel puțin 5 caractere.",
  }),
});

type FormData = z.infer<typeof schema>;

const firebaseClient = new FirebaseClient("/categories");

interface Props {
  styleClass?: string;
}
const NewCategoryModal = ({ styleClass }: Props) => {
  const [isActive, setActive] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { data: categories } = useCategories();
  const newId = categories?.result ? categories.result.length : 999;

  const onSubmit = async (data: FormData) => {
    let categorySlug = slugify(data.category, {
      replacement: "-",
      lower: true,
    });
    try {
      await firebaseClient.post(
        { name: data.category, slug: categorySlug },
        newId.toString()
      );
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      showToast("Categoria a fost adaugată cu succes!", Method.Success);
    } catch (error: any) {
      showToast("Eroare la adaugarea noii categorii.", Method.Error);
    } finally {
      reset();
    }
  };

  return (
    <>
      <ToggleModalButton
        isActive={isActive}
        setActive={setActive}
        styleClass={styleClass}
        textContent="Adaugă Categorie"
        modalId="newCategoryModal"
      />

      <Modal
        modalId="newCategoryModal"
        modalTitle="Adaugă o Categorie Nouă"
        setActive={setActive}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {isSubmitting ? (
              <LoadingButton
                styleClass="btn btn-primary text-light"
                textContent="Procesare..."
              />
            ) : (
              <button type="submit" className="btn btn-primary text-light">
                Adaugă
              </button>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default NewCategoryModal;
