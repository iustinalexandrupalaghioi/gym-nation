import {
  useState,
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useRef,
} from "react";

import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { DocumentData } from "firebase/firestore";
import slugify from "slugify";
import Workout from "../../entities/Workout";
import FirebaseClient from "../../utilities/firebase-client";
import showToast, { Method } from "../../utilities/showToast";
import useGetFileURL from "../useGetFileURL";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
interface Errors {
  title: string;
  workoutDescription: string;
  image: string;
  sections: string;
  exercises: string;
}

const useAddWorkout = (
  workout: Workout,
  setWorkout: React.Dispatch<SetStateAction<Workout>>
) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const initialErrorState = {
    title: "",
    workoutDescription: "",
    image: "",
    sections: "",
    exercises: "",
  };
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fileInputRefImage = useRef<FileUpload>(null);
  const selectInputRef = useRef<HTMLSelectElement>(null);

  const [errors, setErrors] = useState<Errors>(initialErrorState);

  async function processWorkoutData(workout: Workout) {
    const { title, workoutDescription, image, sections } = workout;
    setErrors(initialErrorState);

    let hasError = false;

    if (!title) {
      setErrors((prev) => ({ ...prev, title: "Titlul este obligatoriu." }));
      hasError = true;
    }

    if (!workoutDescription) {
      setErrors((prev) => ({
        ...prev,
        workoutDescription: "Descrierea antrenamentului este obligatorie.",
      }));
      hasError = true;
    }

    if (!image) {
      setErrors((prev) => ({
        ...prev,
        image: "Imaginea este obligatorie.",
      }));
      hasError = true;
    }

    if (sections.length === 0) {
      setErrors((prev) => ({
        ...prev,
        sections: "Adăugați cel puțin o secțiune cu exerciții.",
      }));
      hasError = true;
    }

    sections.forEach((section) => {
      if (section.exercises.length === 0) {
        setErrors((prev) => ({
          ...prev,
          exercises: "Adăugați cel puțin un exercițiu pentru fiecare secțiune.",
        }));
        hasError = true;
      }
    });

    if (hasError) {
      return null;
    }

    let imageURL = image ? await useGetFileURL(image, "workoutImages") : "";
    let titleSlug = slugify(title, { replacement: "-", lower: true });

    return {
      title,
      workoutDescription,
      titleSlug,
      imageURL,
      sections,
    };
  }

  const firebaseClient = new FirebaseClient("/workouts");

  async function postNewWorkout(data: DocumentData) {
    try {
      await firebaseClient.post(data);
      setWorkout({
        title: "",
        workoutDescription: "",
        image: null,
        sections: [],
      });
      if (fileInputRefImage.current) {
        fileInputRefImage.current.setFiles([]);
      }
      if (selectInputRef.current) {
        selectInputRef.current.value = "";
      }
      await queryClient.invalidateQueries({ queryKey: ["workouts"] });
      showToast("Antrenamentul a fost adăugat cu succes", Method.Success, () =>
        navigate("/admin/workouts")
      );
    } catch (error: any) {
      console.error(error.message);
      showToast(
        "Antrenamentul nu a putut fi adăugat. Încercați mai târziu.",
        Method.Error
      );
    }
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setWorkout((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }

  const handleSelectFile = (event: FileUploadSelectEvent) => {
    const files = event.files;
    if (files && files.length > 0) {
      setWorkout((prev) => ({ ...prev, image: files[0] }));
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      event.preventDefault();
      const data = await processWorkoutData(workout);
      if (data) {
        await postNewWorkout(data);
      }
      if (errors.sections != "")
        setErrors((prevErrors) => ({
          ...prevErrors,
          sections: "",
        }));
      if (errors.exercises != "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          exercises: "",
        }));
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    workout,
    errors,
    fileInputRefImage,
    selectInputRef,
    isLoading,
    handleChange,
    handleSubmit,
    handleSelectFile,
    setErrors,
  };
};

export default useAddWorkout;
