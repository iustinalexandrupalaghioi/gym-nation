import { GrFormAdd } from "react-icons/gr";
import { SetStateAction, useEffect } from "react";
import useAddWorkout from "../../../hooks/useAddWorkout";
import Workout from "../../../entities/Workout";
import showToast, { Method } from "../../../utilities/showToast";
import LoadingButton from "../../account/LoadingButton";
import { FileUpload } from "primereact/fileupload";

interface Props {
  workout: Workout;
  setWorkout: React.Dispatch<SetStateAction<Workout>>;
}

const NewWorkoutForm = ({ workout, setWorkout }: Props) => {
  const {
    workout: { title, workoutDescription, price },
    errors,
    fileInputRefImage,
    selectInputRef,
    isLoading,
    handleChange,
    handleSubmit,
    handleSelectFile,
    setErrors,
  } = useAddWorkout(workout, setWorkout);

  useEffect(() => {
    if (errors.sections) {
      showToast(errors.sections, Method.Warning);
    }
    if (errors.exercises) {
      showToast(errors.exercises, Method.Warning);
    }
  }, [errors.sections, errors.exercises]);

  return (
    <div className="container-fluid px-md-4 py-md-5 p-0">
      <form
        className="form bg-body-tertiary border-0 shadow p-4 rounded-4"
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-3">
          <label className="text-body-secondary" htmlFor="title">
            Titlul antrenamentului
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="form-control border-0"
            placeholder="ex: Antrenament pentru spate"
            value={title}
            onChange={handleChange}
          />
          {errors.title && <p className="text-danger">{errors.title}</p>}
        </div>

        <div className="form-group mb-3">
          <label className="text-body-secondary" htmlFor="description">
            Descrierea antrenamentului
          </label>
          <input
            id="description"
            type="text"
            name="workoutDescription"
            className="form-control border-0"
            placeholder="ex: Antrenament cuprinzator format din 5 exercitii..."
            value={workoutDescription}
            onChange={handleChange}
          />
          {errors.workoutDescription && (
            <p className="text-danger">{errors.workoutDescription}</p>
          )}
        </div>

        <div className="form-group mb-3">
          <label className="text-body-secondary" htmlFor="price">
            Prețul antrenamentului (lei)
          </label>
          <input
            id="price"
            type="number"
            name="price"
            className="form-control border-0"
            placeholder="ex: 255"
            value={price}
            onChange={handleChange}
          />
          {errors.price && <p className="text-danger">{errors.price}</p>}
        </div>

        <div className="form-group mb-3">
          <FileUpload
            className="btn btn-dark"
            mode="basic"
            name="image"
            accept="image/*"
            maxFileSize={1000000}
            chooseLabel="&nbsp;Încarcă o imagine"
            onSelect={handleSelectFile}
            ref={fileInputRefImage}
          />
          {errors.image && <p className="text-danger">{errors.image}</p>}
        </div>

        <div className="buttons d-flex flex-column flex-md-row gap-2 justify-content-between">
          <div className="action-buttons d-flex flex-column flex-lg-row gap-2">
            <button
              className="btn btn-primary d-flex justify-content-center text-light align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#newSection"
              type="button"
            >
              <GrFormAdd size={"24px"} /> Secțiune nouă
            </button>
            <button
              className="btn btn-primary d-flex justify-content-center text-light align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#newExercise"
              type="button"
            >
              <GrFormAdd size={"24px"} /> Adaugă Exerciții
            </button>
          </div>

          <div className="action-buttons d-flex gap-2 flex-column flex-lg-row">
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={() => {
                setWorkout({
                  title: "",
                  workoutDescription: "",
                  price: "",
                  image: null,
                  sections: [],
                });
                setErrors({
                  title: "",
                  workoutDescription: "",
                  price: "",
                  image: "",
                  sections: "",
                  exercises: "",
                });
                if (fileInputRefImage.current) {
                  fileInputRefImage.current.setFiles([]);
                }

                if (selectInputRef.current) {
                  selectInputRef.current.value = "";
                }
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
                Salvează
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewWorkoutForm;
