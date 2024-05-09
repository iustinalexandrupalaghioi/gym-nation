import { ChangeEvent, FormEvent, useState } from "react";
import useImage from "./useImage";
import slugify from "slugify";
import FirebaseClient from "../utilities/firebase-client";
import { DocumentData } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useMuscles from "./useMuscles";

interface Workout {
  title: string;
  muscleSlug: string;
  image: File | null;
}
const useAddWorkout = () => {
  const [workout, setWorkout] = useState<Workout>({
    title: "",
    muscleSlug: "",
    image: null,
  });
  const navigate = useNavigate();
  const { data: muscles } = useMuscles();

  async function processWorkoutData(
    title: string,
    muscleSlug: string,
    image: File | null
  ) {
    let imageURL = await useImage(image, "workoutImages");

    let titleSlug = slugify(title, { replacement: "-", lower: true });

    const muscleDoc = muscles?.result.find((m) => m.data().slug === muscleSlug);
    const muscleGroup = muscleDoc?.data();
    return { title, titleSlug, muscleGroup, imageURL };
  }
  const firebaseClient = new FirebaseClient("/workouts");
  async function postNewWorkout(data: DocumentData) {
    await firebaseClient
      .post(data)
      .then(() => {
        // queryClient.invalidateQueries({ queryKey: ["workouts"] });
        alert("Antrenamentul a fost adaugat cu succces");
      })
      .catch((err) => {
        console.error(err.message);
        alert("Antrenamentul nu a putut fi adaugat. Incercati mai tarziu.");
      });
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    if (name === "title") {
      setWorkout((prev) => ({ ...prev, title: value }));
    } else if (name === "muscle") {
      setWorkout((prev) => ({ ...prev, muscleSlug: value }));
    } else if (
      event.target instanceof HTMLInputElement &&
      event.target.type === "file"
    ) {
      const files = event.target.files;
      if (files && files.length > 0) {
        setWorkout((prev) => ({ ...prev, image: files[0] }));
      }
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { title, muscleSlug, image } = workout;

    const data = await processWorkoutData(title, muscleSlug, image);
    await postNewWorkout(data);
    navigate("/workouts");
  }

  return { workout, handleChange, handleSubmit };
};

export default useAddWorkout;
