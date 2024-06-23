import slugify from "slugify";
import FirebaseClient from "../../../utilities/firebase-client";
import ToggleModalButton from "../../dashboard/ToggleModalButton";
import Modal from "../../dashboard/Modal";
import showToast, { Method } from "../../../utilities/showToast";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { queryClient } from "../../../main";
import LoadingButton from "../../account/LoadingButton";

const schema = z.object({
  muscleGroup: z.string().min(5, {
    message: "O grupă nouă de mușchi ar trebui să aibă cel puțin 5 caractere.",
  }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  styleClass?: string;
}
const firebaseClient = new FirebaseClient("/muscles");
const NewGroupModal = ({ styleClass }: Props) => {
  const [isActive, setActive] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    let muscleGroupSlug = slugify(data.muscleGroup, {
      replacement: "-",
      lower: true,
    });
    try {
      await firebaseClient.post({
        name: data.muscleGroup,
        slug: muscleGroupSlug,
      });
      await queryClient.invalidateQueries({ queryKey: ["muscles"] });
      showToast("Grupa de mușchi a fost adaugata cu succes!", Method.Success);
    } catch (error: any) {
      showToast("Eroare la adaugarea noii grupe musculare.", Method.Error);
    } finally {
      reset();
    }
  };
  return (
    <>
      <ToggleModalButton
        isActive={isActive}
        setActive={setActive}
        textContent="Adaugă Grupă Musculară"
        modalId="newGroupModal"
        styleClass={styleClass}
      />

      <Modal
        modalId="newGroupModal"
        modalTitle="Adaugă o Grupă de Mușchi Nouă"
        setActive={setActive}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3">
            <label className="text-body-secondary" htmlFor="muscleGroup">
              Denumire:
            </label>
            <input
              {...register("muscleGroup")}
              type="text"
              className="form-control border-0"
              id="muscleGroup"
              placeholder="ex: Biceps femural"
            />
            {errors.muscleGroup && (
              <p className="text-danger"> {errors.muscleGroup.message}</p>
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

export default NewGroupModal;
