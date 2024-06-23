import { SetStateAction } from "react";
import useAddExercise from "../../../hooks/useAddExercise";
import Workout, { Section } from "../../../entities/Workout";
import LoadingButton from "../../account/LoadingButton";
import { FileUpload } from "primereact/fileupload";
import useMuscles from "../../../hooks/useMuscles";

interface Props {
  sections: Section[];
  setWorkout: React.Dispatch<SetStateAction<Workout>>;
}

const NewExercise = ({ sections, setWorkout }: Props) => {
  const { data: muscles } = useMuscles();
  const {
    selectInputRefMuscle,
    selectInputRefSection,
    exercise: { exerciseName, exerciseDescription },
    errors,
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
                <label className="text-body-secondary" htmlFor="muscles">
                  Alege secțiunea pentru care adaugi exerciții
                </label>
                <select
                  className="form-select border-0"
                  onChange={handleChange}
                  ref={selectInputRefSection}
                  id="sectionSelect"
                  name="sectionId"
                >
                  <option value="">{"Alege din listă"}</option>
                  {sections.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                {errors.sectionId && (
                  <p className="text-danger">{errors.sectionId}</p>
                )}
              </div>
              <div className="form-group mb-3">
                <label className="text-body-secondary" htmlFor="muscles">
                  Alege partea corpului corespunzătoare
                </label>
                <select
                  className="form-select border-0"
                  onChange={handleChange}
                  ref={selectInputRefMuscle}
                  id="muscles"
                  name="muscleSlug"
                >
                  <option value="">{"Alege din listă"}</option>
                  {muscles?.result.map(
                    (option, index) =>
                      option.data().slug !== "" && (
                        <option key={index} value={option.data().slug}>
                          {option.data().name}
                        </option>
                      )
                  )}
                </select>
                {errors.muscleSlug && (
                  <p className="text-danger">{errors.muscleSlug}</p>
                )}
              </div>
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
                  value={exerciseName}
                  placeholder="Ridicări laterale"
                />
                {errors.exerciseName && (
                  <p className="text-danger">{errors.exerciseName}</p>
                )}
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
                  name="video"
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
                      sectionId: "",
                      exerciseName: "",
                      exerciseDescription: "",
                      muscleSlug: "",

                      video: "",
                    });
                    setExercise({
                      sectionId: "",
                      exerciseName: "",
                      exerciseDescription: "",

                      video: null,
                    });

                    if (fileInputRefVideo.current) {
                      fileInputRefVideo.current.setFiles([]);
                    }

                    if (selectInputRefMuscle.current) {
                      selectInputRefMuscle.current.value = "";
                    }
                    if (selectInputRefSection.current) {
                      selectInputRefSection.current.value = "";
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
