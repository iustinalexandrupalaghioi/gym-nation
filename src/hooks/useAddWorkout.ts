import { ChangeEvent, FormEvent, SetStateAction } from "react";
import useGetFileURL from "./useGetFileURL";
import slugify from "slugify";
import FirebaseClient from "../utilities/firebase-client";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useMuscles from "./useMuscles";
import Workout from "../entities/Workout";
import showToast, { Method } from "../utilities/showToast";

const useAddWorkout = (
  workout: Workout,
  setWorkout: React.Dispatch<SetStateAction<Workout>>
) => {
  const navigate = useNavigate();
  const { data: muscles } = useMuscles();

  async function processWorkoutData(workout: Workout) {
    const { title, workoutDescription, price, muscleSlug, image, exercises } =
      workout;
    let imageURL = image ? await useGetFileURL(image, "workoutImages") : "";

    let titleSlug = slugify(title, { replacement: "-", lower: true });
    if (parseInt(price) <= 0) {
      return showToast(
        "Prețul antrenamentului trebuie să fie un număr pozitiv.",
        Method.Warning
      );
    }
    const muscleDoc = muscleSlug
      ? muscles?.result.find((m) => m.data().slug === muscleSlug)
      : ({} as QueryDocumentSnapshot);
    const muscleGroup = muscleDoc?.data();
    if (!muscleDoc)
      return showToast(
        "Selecteaza o grupa musculara mai intai.",
        Method.Warning
      );
    return {
      title,
      workoutDescription,
      price,
      titleSlug,
      muscleGroup,
      imageURL,
      exercises,
    };
  }
  const firebaseClient = new FirebaseClient("/workouts");
  async function postNewWorkout(data: DocumentData) {
    await firebaseClient
      .post(data)
      .then(() => {
        // queryClient.invalidateQueries({ queryKey: ["workouts"] });
        showToast("Antrenamentul a fost adaugat cu succces", Method.Success);
      })
      .catch((err) => {
        console.error(err.message);
        showToast(
          "Antrenamentul nu a putut fi adaugat. Incercati mai tarziu.",
          Method.Error
        );
      });
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    //set title of workout
    if (name === "title") {
      setWorkout((prev) => ({ ...prev, title: value }));
    }

    //set targeted muscle group
    else if (name === "muscle") {
      setWorkout((prev) => ({ ...prev, muscleSlug: value }));
    }

    //set description for workout
    else if (name === "workoutDescription") {
      setWorkout((prev) => ({ ...prev, workoutDescription: value }));
    }

    //set price of workout
    else if (name === "price") {
      setWorkout((prev) => ({ ...prev, price: value }));
    }

    //set image of workout
    else if (
      event.target instanceof HTMLInputElement &&
      event.target.type === "file" &&
      name === "workoutImage"
    ) {
      const files = event.target.files;
      if (files && files.length > 0) {
        setWorkout((prev) => ({ ...prev, image: files[0] }));
      }
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = await processWorkoutData(workout);
    if (!data) return;
    await postNewWorkout(data);
    navigate("/workouts");
  }

  return { workout, handleChange, handleSubmit };
};

export default useAddWorkout;
