import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import slugify from "slugify";
import Workout from "../entities/Workout";
import Exercise from "../entities/Exercise";
import useGetFileURL from "./useGetFileURL";
import showToast, { Method } from "../utilities/showToast";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";

interface Errors {
  name: string;
  exerciseDescription: string;
  image: string;
  video: string;
}

const useAddExercise = (
  setWorkout: React.Dispatch<SetStateAction<Workout>>
) => {
  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    exerciseDescription: "",
    image: null,
    video: null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialErrorState: Errors = {
    name: "",
    exerciseDescription: "",
    image: "",
    video: "",
  };

  const [errors, setErrors] = useState<Errors>(initialErrorState);

  const fileInputRefImage = useRef<FileUpload>(null);
  const fileInputRefVideo = useRef<FileUpload>(null);

  // state management for exercise form
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    // set exercise name
    if (name === "exerciseName") {
      setExercise((prev) => ({ ...prev, name: value }));
    }

    // set exercise description
    else if (name === "exerciseDescription") {
      setExercise((prev) => ({ ...prev, exerciseDescription: value }));
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleFileSelect = (event: FileUploadSelectEvent) => {
    if (fileInputRefImage.current) {
      const files = event.files;
      if (files && files.length > 0) {
        setExercise((prev) => ({ ...prev, image: files[0] }));
      }
    }
    if (fileInputRefVideo.current) {
      const files = event.files;
      if (files && files.length > 0) {
        setExercise((prev) => ({ ...prev, video: files[0] }));
      }
    }
  };

  const processExercise = async (exercise: Exercise) => {
    const { name, exerciseDescription, image, video } = exercise;

    setErrors(initialErrorState);

    let hasError = false;

    if (!name) {
      setErrors((prev) => ({
        ...prev,
        name: "Numele exercițiului este obligatoriu.",
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

    if (!image) {
      setErrors((prev) => ({
        ...prev,
        image: "Este obligatorie adăugarea unei imagini.",
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

    let imageURL = image && (await useGetFileURL(image, "workoutImages"));
    let videoLink = video && (await useGetFileURL(video, "exerciseVideos"));
    let nameSlug = slugify(name, { replacement: "-", lower: true });

    //return final exercise
    return {
      name,
      nameSlug,
      exerciseDescription,
      imageURL,
      videoLink,
    };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    try {
      event.preventDefault();
      const data = await processExercise(exercise);
      if (data) {
        //set exercise for workout on submit
        setWorkout((prev) => ({
          ...prev,
          exercises: [...prev.exercises, data],
        }));

        // clear state for exercise form
        setExercise({
          name: "",
          exerciseDescription: "",
          image: null,
          video: null,
        });

        if (fileInputRefImage.current) {
          fileInputRefImage.current.setFiles([]);
        }

        if (fileInputRefVideo.current) {
          fileInputRefVideo.current.setFiles([]);
        }

        showToast("Exercițiul a fost adăugat cu succes!", Method.Success);
      }
    } catch (error) {
      showToast("Ceva nu a funcționat.", Method.Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    exercise,
    errors,
    fileInputRefImage,
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
