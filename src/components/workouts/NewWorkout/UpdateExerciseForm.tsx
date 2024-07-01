import { FileUpload } from "primereact/fileupload";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import useMuscles from "../../../hooks/Workout/useMuscles";
import { Section } from "../../../entities/Workout";
import { MdEdit } from "react-icons/md";
import Exercise from "../../../entities/Exercise";
import LoadingButton from "../../account/LoadingButton";

interface Props {
  exercise: Exercise;
  modalId: string;
  sections: Section[];
  workout: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
  onUpdateExercise: () => void;
}

const UpdateExerciseModal = ({ modalId, sections }: Props) => {
  // get muscle groups
  const { data: muscles } = useMuscles();

  return (
    <>
      <button
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
        title="Modifică exercițiul"
        className="btn btn-outline-info d-inline-flex align-items-center justify-content-center"
      >
        <MdEdit />
      </button>
      <div className="modal fade" id={modalId} tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Actualizează exercițiul
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body bg-body-tertiary">
              <form>
                <div className="form-group mb-3">
                  <label className="text-body-secondary" htmlFor="muscles">
                    Alege secțiunea din care face parte exercițiul
                  </label>
                  <select
                    className="form-select border-0"
                    id="sectionSelect"
                    name="sectionId"
                  >
                    <option value="">{"Alege din listă"}</option>
                    {sections.map((option: Section, index: number) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label className="text-body-secondary" htmlFor="muscles">
                    Alege partea corpului corespunzătoare
                  </label>
                  <select
                    className="form-select border-0"
                    id="muscles"
                    name="muscleSlug"
                  >
                    <option value="">{"Alege din listă"}</option>
                    {muscles?.result.map(
                      (
                        option: QueryDocumentSnapshot<
                          DocumentData,
                          DocumentData
                        >,
                        index: number
                      ) =>
                        option.data().slug !== "" && (
                          <option key={index} value={option.data().slug}>
                            {option.data().name}
                          </option>
                        )
                    )}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label className="text-body-secondary" htmlFor="exerciseName">
                    Introdu numele exercițiului
                  </label>
                  <input
                    type="text"
                    className="form-control border-0"
                    id="exerciseName"
                    placeholder="Ridicări laterale"
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="text-body-secondary" htmlFor="instructions">
                    Descrie modul de execuție
                  </label>
                  <input
                    type="text"
                    className="form-control border-0"
                    id="instructions"
                    placeholder="Ridicări laterale: Execută mișcarea încet și regulat. "
                  />
                </div>

                <div className="form-group mb-3">
                  <FileUpload
                    className="btn btn-dark"
                    mode="basic"
                    name="video"
                    accept="video/*"
                    chooseLabel="&nbsp;Încarcă un video"
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    data-bs-dismiss="modal"
                  >
                    Anulează
                  </button>
                  <LoadingButton
                    textContent="Procesare.."
                    styleClass="btn btn-primary text-light"
                  />

                  <button
                    type="submit"
                    className="btn btn-primary text-light"
                    data-bs-dismiss={`modal`}
                  >
                    Salvează modificările
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateExerciseModal;
