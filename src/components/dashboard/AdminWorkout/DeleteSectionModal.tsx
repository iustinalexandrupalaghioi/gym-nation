import { MdDeleteForever } from "react-icons/md";
import showToast, { Method } from "../../../utilities/showToast";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Section } from "../../../entities/Workout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FirebaseClient from "../../../utilities/firebase-client";

interface Props {
  modalId: string;
  question: string;
  successMessage: string;
  errorMessage: string;
  sectionIdToDelete: number;
  queryKey: string;
  workout: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
  onDeleteSection: () => void;
}
const DeleteSectionModal = ({
  modalId,
  question,
  successMessage,
  errorMessage,
  sectionIdToDelete,
  onDeleteSection,
  queryKey,
  workout,
}: Props) => {
  const firebaseClient = new FirebaseClient(queryKey);
  const queryClient = useQueryClient();
  // define mutation function and rename it to updateWorkout
  const { mutateAsync: updateWorkout } = useMutation({
    mutationFn: async (updatedWorkout: any) => {
      const response = await firebaseClient.update(workout!.id, updatedWorkout);
      if (!response) {
        throw new Error("Failed to update workout");
      }
      return response;
    },
    onSuccess: async () => {
      showToast(successMessage, Method.Success);
      await queryClient.refetchQueries({ queryKey: [queryKey] });
    },
    onError: () => {
      showToast(errorMessage, Method.Error);
    },
  });

  const handleDelete = async () => {
    if (workout) {
      const updatedWorkout = { ...workout.data() };
      updatedWorkout.sections = updatedWorkout.sections.filter(
        (section: Section) => section.id !== sectionIdToDelete
      );
      await updateWorkout(updatedWorkout);
      onDeleteSection();
    }
  };
  return (
    <>
      <button
        className="btn btn-outline-danger d-inline-flex align-items-center justify-content-center"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        <MdDeleteForever />
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
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-body-tertiary">
              <p className="mb-2">{question}</p>
              <p className="text-danger">
                Efectele aceastei acțiuni sunt ireversibile, iar datele șterse
                nu vor putea fi recuperate.
              </p>
              <div className="d-flex gap-2 justify-content-end">
                <button
                  className="btn btn-outline-info"
                  data-bs-toggle="modal"
                  data-bs-target={`#${modalId}`}
                  onClick={() => {
                    showToast("Acțiune de ștergere întreruptă.", Method.Info);
                  }}
                >
                  Nu
                </button>
                <button
                  className="btn btn-primary text-light"
                  data-bs-toggle="modal"
                  data-bs-target={`#${modalId}`}
                  onClick={handleDelete}
                >
                  Da
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteSectionModal;
