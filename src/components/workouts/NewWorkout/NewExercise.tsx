import { SetStateAction } from "react";
import useAddExercise from "../../../hooks/useAddExercise";
import Workout from "../../../entities/Workout";

interface Props {
  setWorkout: React.Dispatch<SetStateAction<Workout>>;
}
const NewExercise = ({ setWorkout }: Props) => {
  const {
    exercise: { name, exerciseDescription },
    fileInputRefImage,
    fileInputRefVideo,
    handleChange,
    handleSubmit,
  } = useAddExercise(setWorkout);

  return (
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
              Adaugă un nou exercițiu
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="exerciseName">
                  Introdu numele exercițiului
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="exerciseName"
                  id="exerciseName"
                  onChange={handleChange}
                  value={name}
                  placeholder="Ridicări laterale"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="instructions">Descrie modul de execuție</label>
                <input
                  type="text"
                  className="form-control"
                  name="exerciseDescription"
                  onChange={handleChange}
                  value={exerciseDescription}
                  id="instructions"
                  placeholder="Ridicări laterale: Execută mișcarea încet și regulat. "
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exerciseThumbnail">
                  Încarcă o imagine de prezentare
                </label>
                <input
                  ref={fileInputRefImage}
                  type="file"
                  className="form-control"
                  onChange={handleChange}
                  name="exerciseThubnail"
                  id="exerciseThubnail"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exerciseVideo">Încarcă un video</label>
                <input
                  type="file"
                  ref={fileInputRefVideo}
                  className="form-control"
                  onChange={handleChange}
                  id="exerciseVideo"
                  name="exerciseVideo"
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-primary btnOutline"
                  data-bs-dismiss="modal"
                >
                  Anulează
                </button>
                <button type="submit" className="btn btn-primary text-light">
                  Adaugă
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewExercise;
