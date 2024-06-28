import slugify from "slugify";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FirebaseClient from "../../../utilities/firebase-client";
import { queryClient } from "../../../main";
import showToast, { Method } from "../../../utilities/showToast";
import ToggleModalButton from "../../dashboard/ToggleModalButton";
import Modal from "../../dashboard/Modal";
import LoadingButton from "../../account/LoadingButton";
import { useMutation } from "@tanstack/react-query";

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

  // define mutation function and rename it to updateGroup
  const { mutateAsync: createGroup } = useMutation({
    mutationFn: async (newGroup: any) => {
      await firebaseClient.post(newGroup);
    },
    onSuccess: async () => {
      showToast("Grupa musculară a fost adăugată cu succes!", Method.Success);
      await queryClient.invalidateQueries({ queryKey: ["muscles"] });
    },
    onError: () => {
      showToast("Nu s-a putut efectua acțiunea de actualizare.", Method.Error);
    },
  });
  const onSubmit = async (data: FormData) => {
    let muscleGroupSlug = slugify(data.muscleGroup, {
      replacement: "-",
      lower: true,
    });
    const newGroup = {
      name: data.muscleGroup,
      slug: muscleGroupSlug,
    };

    try {
      await createGroup(newGroup);
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
              data-bs-toggle="modal"
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
              <button
                data-bs-dismiss="modal"
                type="submit"
                className="btn btn-primary text-light"
              >
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
