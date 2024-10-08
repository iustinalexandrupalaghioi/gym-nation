import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import slugify from "slugify";
import useMuscles from "./useMuscles";
import Workout from "../../entities/Workout";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import Exercise from "../../entities/Exercise";
import showToast, { Method } from "../../utilities/showToast";
import useGetFileURL from "../useGetFileURL";

interface Errors {
  sectionId: string;
  muscleSlug: string;
  exerciseName: string;
  exerciseDescription: string;
  video: string;
}

const useAddExercise = (
  setWorkout: React.Dispatch<SetStateAction<Workout>>
) => {
  const { data: muscles } = useMuscles();
  const [exercise, setExercise] = useState<Exercise>({
    sectionId: "",
    exerciseName: "",
    exerciseDescription: "",
    muscleSlug: "",
    video: null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialErrorState: Errors = {
    sectionId: "",
    muscleSlug: "",
    exerciseName: "",
    exerciseDescription: "",
    video: "",
  };

  const [errors, setErrors] = useState<Errors>(initialErrorState);

  const fileInputRefVideo = useRef<FileUpload>(null);
  const selectInputRefSection = useRef<HTMLSelectElement>(null);
  const selectInputRefMuscle = useRef<HTMLSelectElement>(null);

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

    if (!video) {
      setErrors((prev) => ({
        ...prev,
        video: "Este obligatorie adăugarea unui videoclip.",
      }));
      hasError = true;
    }

    if (hasError) return null;

    const videoLink = video ? await useGetFileURL(video, "exerciseVideos") : "";
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
      const data = await processExercise(exercise);
      if (data) {
        setWorkout((prev) => {
          const sectionIndex = prev.sections.findIndex(
            (s) => s.id === Number(data.sectionId)
          );

          if (sectionIndex === -1) {
            return prev;
          }

          const newSections = [...prev.sections];
          newSections[sectionIndex] = {
            ...newSections[sectionIndex],
            exercises: [...newSections[sectionIndex].exercises, data],
          };

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
          return {
            ...prev,
            sections: newSections,
          };
        });

        showToast("Exercițiul a fost adăugat cu succes!", Method.Success);
      }
    } catch (error) {
      showToast("Ceva nu a funcționat.", Method.Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    selectInputRefMuscle,
    selectInputRefSection,
    exercise,
    errors,
    fileInputRefVideo,
    isLoading,
    handleChange,
    handleSubmit,
    handleFileSelect,
    setExercise,
    setErrors,
  };
};

export default useAddExercise;
