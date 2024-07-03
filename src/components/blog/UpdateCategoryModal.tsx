import slugify from "slugify";
import FirebaseClient from "../../utilities/firebase-client";
import Modal from "../dashboard/Modal";
import showToast, { Method } from "../../utilities/showToast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { queryClient } from "../../main";
import LoadingButton from "../account/LoadingButton";
import { MdEdit } from "react-icons/md";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect } from "react";

const schema = z.object({
  category: z.string().min(5, {
    message: "O categorie ar trebui să aibă cel puțin 5 caractere.",
  }),
});

type FormData = z.infer<typeof schema>;

const firebaseClient = new FirebaseClient("/categories");

interface Props {
  modalId?: string;
  category: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
}
const UpdateCategoryModal = ({ modalId, category }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (category) setValue("category", category.data().name);
  }, [category]);

  const onSubmit = async (data: FormData) => {
    let categorySlug = slugify(data.category, {
      replacement: "-",
      lower: true,
    });
    try {
      await firebaseClient.update(category!.id, {
        name: data.category,
        slug: categorySlug,
      });
      await queryClient.refetchQueries({ queryKey: ["categories"] });
      showToast("Categoria a fost actualizată cu succes!", Method.Success);
    } catch (error: any) {
      showToast("Categoria nu a putut fi actualizată.", Method.Error);
    } finally {
      reset();
    }
  };

  return (
    <>
      <button
        className="btn btn-outline-info d-inline-flex justify-content-center align-items-center me-2 mb-2"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        <MdEdit />
      </button>

      <Modal modalId={modalId!} modalTitle="Actualizează categoria">
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
            >
              Anulează
            </button>
            {isSubmitting ? (
              <LoadingButton
                styleClass="btn btn-primary text-light"
                textContent="Procesare..."
              />
            ) : (
              <button
                type="submit"
                data-bs-dismiss="modal"
                className="btn btn-primary text-light"
              >
                Salvează modificările
              </button>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UpdateCategoryModal;
