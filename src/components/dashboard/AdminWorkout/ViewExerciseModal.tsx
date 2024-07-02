import { MdRemoveRedEye } from "react-icons/md";
import Exercise from "../../../entities/Exercise";

interface Props {
  exerciseIndex: number;
  exercise: Exercise;
}
const ViewExerciseModal = ({
  exerciseIndex,
  exercise: { exerciseDescription, exerciseName, videoLink },
}: Props) => {
  return (
    <>
      <button
        title="Detalii exercițiu"
        className="btn btn-outline-info d-inline-flex align-items-center justify-content-center me-2 mb-2"
        data-bs-toggle="modal"
        data-bs-target={`#exerciseModal-${exerciseIndex}`}
      >
        <MdRemoveRedEye />
      </button>

      <div
        className="modal fade"
        id={`exerciseModal-${exerciseIndex}`}
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
                className="modal-title text-primary fs-5"
                id="staticBackdropLabel"
              >
                {exerciseName}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <video
                controls
                src={videoLink!}
                className="rounded-4 w-100 mb-2"
                autoPlay
                muted
              />
              <p className="text-body-secondary mb-0">
                <span className="text-primary">Descriere: </span>
                {exerciseDescription}
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary text-light"
                data-bs-dismiss={`modal`}
              >
                Închide
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewExerciseModal;
