import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingButton from "../../account/LoadingButton";
import slugify from "slugify";
import FirebaseClient from "../../../utilities/firebase-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import showToast, { Method } from "../../../utilities/showToast";
import { useEffect } from "react";
import { MdEdit } from "react-icons/md";
import useMuscle from "../../../hooks/Workout/useMuscle";
const schema = z.object({
  muscleGroup: z.string().min(5, {
    message:
      "Denumirea unei grupe de mușchi ar trebui să aibă cel puțin 5 caractere.",
  }),
});

type FormData = z.infer<typeof schema>;

const firebaseClient = new FirebaseClient("/muscles");

interface Props {
  modalId: string;
  docId: string;
}
const UpdateGroupModal = ({ modalId, docId }: Props) => {
  const { data } = useMuscle(docId);
  const group = data?.result[0];
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  // populate form fields with data from firestore
  useEffect(() => {
    if (group) {
      setValue("muscleGroup", group.data().name);
    }
  }, [group]);

  // define mutation function and rename it to updateGroup
  const { mutateAsync: updateGroup } = useMutation({
    mutationFn: async (updatedGroup: any) => {
      const response = await firebaseClient.update(group!.id, updatedGroup);
      if (!response) {
        throw new Error("Failed to update muscle group");
      }
      return response;
    },
    onSuccess: async () => {
      showToast(
        "Grupa musculară a fost actualizată cu succes!",
        Method.Success
      );
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
      await updateGroup(newGroup);
    } finally {
      reset();
    }
  };

  return (
    <>
      <button
        className="btn btn-outline-info d-inline-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        <MdEdit />
      </button>

      <div
        className="modal fade"
        id={modalId}
        tabIndex={-1}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content ">
            <div className="modal-header">
              <h1
                className="modal-title text-light fs-5"
                id="staticBackdropLabel"
              >
                Actualizează secțiunea
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-body-tertiary">
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
                      className="btn btn-primary text-light"
                    >
                      Salvează modificările
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateGroupModal;
