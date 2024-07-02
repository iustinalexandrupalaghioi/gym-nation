import { MdEdit } from "react-icons/md";
import Exercise from "../../../entities/Exercise";

interface Props {
  modalId: string;
  exercise: Exercise;
}

const UpdateExerciseModal = ({ modalId, exercise }: Props) => {
  const { exerciseName } = exercise;
  return (
    <>
      <button
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
        className="btn btn-outline-info d-inline-flex justify-content-center align-items-center"
      >
        <MdEdit />
      </button>
      <div
        className="modal fade"
        id="newExercise"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Actualizează exercițiul {exerciseName}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-body-tertiary">
              <form></form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateExerciseModal;
