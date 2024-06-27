import { MdDeleteForever } from "react-icons/md";
import FirebaseClient from "../../../utilities/firebase-client";
import showToast, { Method } from "../../../utilities/showToast";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  modalId: string;
  docId: string;
  collection: string;
  question: string;
}
const DeleteModal = ({ modalId, docId, collection, question }: Props) => {
  const queryClient = useQueryClient();
  const firebaseClient = new FirebaseClient(collection);
  const handleDelete = async () => {
    const response = await firebaseClient.delete(docId);
    if (response) {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      showToast("Antrenamentul a fost șters cu succes", Method.Success);
    } else {
      showToast("Antrenamentul nu poate fi șters", Method.Error);
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
        id="deleteWorkoutModal"
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
                Efectele aceastei acțiuni nu pot fi anulate și va duce la
                pierderea completă datelor.
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

export default DeleteModal;
