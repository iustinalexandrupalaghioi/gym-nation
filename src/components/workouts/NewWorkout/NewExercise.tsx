import { SetStateAction } from "react";
import useAddExercise from "../../../hooks/useAddExercise";
import Workout from "../../../entities/Workout";
import LoadingButton from "../../account/LoadingButton";
import { FileUpload } from "primereact/fileupload";

interface Props {
  setWorkout: React.Dispatch<SetStateAction<Workout>>;
}
const NewExercise = ({ setWorkout }: Props) => {
  const {
    exercise: { name, exerciseDescription },
    errors,
    fileInputRefImage,
    fileInputRefVideo,
    handleFileSelect,
    handleChange,
    isLoading,
    handleSubmit,
    setExercise,
    setErrors,
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
          <div className="modal-body bg-body-tertiary">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label className="text-body-secondary" htmlFor="exerciseName">
                  Introdu numele exercițiului
                </label>
                <input
                  type="text"
                  className="form-control border-0"
                  name="exerciseName"
                  id="exerciseName"
                  onChange={handleChange}
                  value={name}
                  placeholder="Ridicări laterale"
                />
                {errors.name && <p className="text-danger">{errors.name}</p>}
              </div>
              <div className="form-group mb-3">
                <label className="text-body-secondary" htmlFor="instructions">
                  Descrie modul de execuție
                </label>
                <input
                  type="text"
                  className="form-control border-0"
                  name="exerciseDescription"
                  onChange={handleChange}
                  value={exerciseDescription}
                  id="instructions"
                  placeholder="Ridicări laterale: Execută mișcarea încet și regulat. "
                />
                {errors.exerciseDescription && (
                  <p className="text-danger">{errors.exerciseDescription}</p>
                )}
              </div>
              <div className="form-group mb-3">
                <FileUpload
                  className="btn btn-dark"
                  mode="basic"
                  name="image"
                  accept="image/*"
                  maxFileSize={1000000}
                  chooseLabel="&nbsp;Încarcă o imagine"
                  onSelect={handleFileSelect}
                  ref={fileInputRefImage}
                />
                {errors.image && <p className="text-danger">{errors.image}</p>}
              </div>
              <div className="form-group mb-3">
                <FileUpload
                  className="btn btn-dark"
                  mode="basic"
                  name="image"
                  accept="video/*"
                  chooseLabel="&nbsp;Încarcă un video"
                  onSelect={handleFileSelect}
                  ref={fileInputRefVideo}
                />
                {errors.video && <p className="text-danger">{errors.video}</p>}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-info"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setErrors({
                      name: "",
                      exerciseDescription: "",
                      image: "",
                      video: "",
                    });
                    setExercise({
                      name: "",
                      nameSlug: "",
                      video: null,
                      videoLink: "",
                      image: null,
                      exerciseDescription: "",
                    });
                  }}
                >
                  Anulează
                </button>
                {isLoading ? (
                  <LoadingButton
                    textContent="Procesare.."
                    styleClass="btn btn-primary text-light"
                  />
                ) : (
                  <button type="submit" className="btn btn-primary text-light">
                    Adaugă
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewExercise;
