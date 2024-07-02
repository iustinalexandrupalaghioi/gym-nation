import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import useMuscles from "../../../hooks/Workout/useMuscles";
import { Section } from "../../../entities/Workout";
import { MdEdit } from "react-icons/md";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Exercise from "../../../entities/Exercise";
import useGetFileURL from "../../../hooks/useGetFileURL";
import slugify from "slugify";
import showToast, { Method } from "../../../utilities/showToast";
import LoadingButton from "../../account/LoadingButton";
import FirebaseClient from "../../../utilities/firebase-client";

interface Props {
  sections: Section[];
  modalId: string;
  workout: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
  initialExercise: Exercise;
  onSuccessUpdate: () => void;
}
interface Errors {
  sectionId: string;
  muscleSlug: string;
  exerciseName: string;
  exerciseDescription: string;
}
const initialErrorState: Errors = {
  sectionId: "",
  muscleSlug: "",
  exerciseName: "",
  exerciseDescription: "",
};
const firebaseClient = new FirebaseClient("/workouts");
const UpdateExerciseModal = ({
  sections,
  modalId,
  workout,
  initialExercise,
  onSuccessUpdate,
}: Props) => {
  const [errors, setErrors] = useState<Errors>(initialErrorState);
  const fileInputRefVideo = useRef<FileUpload>(null);
  const selectInputRefSection = useRef<HTMLSelectElement>(null);
  const selectInputRefMuscle = useRef<HTMLSelectElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: muscles } = useMuscles();
  const [exercise, setExercise] = useState<Exercise>({
    exerciseName: "",
    exerciseDescription: "",
    video: null,
    muscleSlug: "",
    sectionId: "",
  });
  const { exerciseName, exerciseDescription, muscleSlug, sectionId } = exercise;
  // state management for exercise form
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setExercise((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileSelect = (event: FileUploadSelectEvent) => {
    const files = event.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (fileInputRefVideo.current) {
        setExercise((prev) => ({ ...prev, video: file }));
      }
    }
  };
  const processExercise = async (exercise: Exercise) => {
    const { sectionId, muscleSlug, exerciseName, exerciseDescription, video } =
      exercise;

    setErrors(initialErrorState);

    let hasError = false;
    if (!sectionId) {
      setErrors((prev) => ({
        ...prev,
        sectionId: "Selectează o secțiune.",
      }));
      hasError = true;
    }
    if (!muscleSlug) {
      setErrors((prev) => ({
        ...prev,
        muscleSlug: "Selectează o grupă musculară.",
      }));
      hasError = true;
    }

    if (!exerciseName) {
      setErrors((prev) => ({
        ...prev,
        exerciseName: "Numele exercițiului este obligatoriu.",
      }));
      hasError = true;
    }

    if (!exerciseDescription) {
      setErrors((prev) => ({
        ...prev,
        exerciseDescription: "Descrierea antrenamentului este obligatorie.",
      }));
      hasError = true;
    }

    if (hasError) return null;

    const videoLink = video
      ? await useGetFileURL(video, "exerciseVideos")
      : initialExercise.videoLink;
    const nameSlug = slugify(exerciseName, { replacement: "-", lower: true });
    const muscleDoc = muscleSlug
      ? muscles?.result.find(
          (m: QueryDocumentSnapshot<DocumentData, DocumentData>) =>
            m.data().slug === muscleSlug
        )
      : ({} as QueryDocumentSnapshot);
    const muscleGroup = muscleDoc?.data();

    return {
      sectionId,
      muscleGroup,
      exerciseName,
      nameSlug,
      exerciseDescription,
      videoLink,
    };
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    try {
      event.preventDefault();
      const data: Exercise | null = await processExercise(exercise);
      let updatedWorkoutData;
      if (data) {
        updatedWorkoutData = {
          ...workout!.data(),
          sections: workout!.data().sections.map((section: Section) => {
            // Filter out the exercise from its original section
            if (section.id === Number(initialExercise.sectionId)) {
              return {
                ...section,
                exercises: section.exercises.filter(
                  (ex: Exercise) => ex.nameSlug !== initialExercise.nameSlug
                ),
              };
            }

            // Add the exercise to its new section
            if (section.id === Number(data.sectionId)) {
              return {
                ...section,
                exercises: [...section.exercises, data], // Add the updated exercise
              };
            }

            // Return other sections unchanged
            return section;
          }),
        };
      }
      if (updatedWorkoutData) {
        // Update in Firestore
        const response = await firebaseClient.update(
          workout!.id,
          updatedWorkoutData
        );
        if (response) {
          setExercise({
            sectionId: "",
            exerciseName: "",
            muscleSlug: "",
            exerciseDescription: "",
            video: null,
          });

          if (fileInputRefVideo.current) {
            fileInputRefVideo.current.setFiles([]);
          }

          if (selectInputRefSection.current) {
            selectInputRefSection.current.value = "";
          }

          if (selectInputRefMuscle.current) {
            selectInputRefMuscle.current.value = "";
          }

          showToast("Exercițiul a fost actualizat cu succes!", Method.Success);
          onSuccessUpdate(); // Call the onSuccessUpdate callback
        } else {
          showToast("Nu s-a putut efectua actualizarea", Method.Error);
        }
      }
    } catch (error) {
      showToast("Ceva nu a funcționat.", Method.Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (workout) {
      const { exerciseName, exerciseDescription, muscleGroup, sectionId } =
        initialExercise;
      setExercise({
        exerciseName,
        exerciseDescription,
        video: null,
        muscleSlug: muscleGroup?.slug,
        sectionId,
      });
    }
  }, [workout]);

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
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        id={modalId}
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Actualizează exercițiul {exercise.exerciseName}
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
                    Alege secțiunea corespunzătoare
                  </label>
                  <select
                    className="form-select border-0"
                    id="sectionSelect"
                    name="sectionId"
                    value={sectionId}
                    onChange={handleChange}
                    ref={selectInputRefSection}
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
                    Alege grupa musculară specifică exercițiului
                  </label>
                  <select
                    className="form-select border-0"
                    id="muscles"
                    name="muscleSlug"
                    value={muscleSlug}
                    onChange={handleChange}
                    ref={selectInputRefMuscle}
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
                    placeholder="Ridicări laterale"
                    value={exerciseName}
                    onChange={handleChange}
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
                    id="instructions"
                    placeholder="Ridicări laterale: Execută mișcarea încet și regulat. "
                    value={exerciseDescription}
                    onChange={handleChange}
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
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-info"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setExercise({
                        sectionId: "",
                        exerciseName: "",
                        muscleSlug: "",
                        exerciseDescription: "",
                        video: null,
                      });

                      if (fileInputRefVideo.current) {
                        fileInputRefVideo.current.setFiles([]);
                      }

                      if (selectInputRefSection.current) {
                        selectInputRefSection.current.value = "";
                      }

                      if (selectInputRefMuscle.current) {
                        selectInputRefMuscle.current.value = "";
                      }
                      setErrors(initialErrorState);
                    }}
                  >
                    Anulează
                  </button>
                  {isLoading ? (
                    <LoadingButton
                      textContent="Procesare..."
                      styleClass="btn btn-primary text-light"
                    />
                  ) : (
                    <button
                      type="submit"
                      data-bs-dismiss="modal"
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

export default UpdateExerciseModal;
