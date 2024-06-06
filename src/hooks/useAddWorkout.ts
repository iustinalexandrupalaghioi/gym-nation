import { ChangeEvent, FormEvent, SetStateAction } from "react";
import useGetFileURL from "./useGetFileURL";
import slugify from "slugify";
import FirebaseClient from "../utilities/firebase-client";
import { DocumentData } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useMuscles from "./useMuscles";
import Workout from "../entities/Workout";

const useAddWorkout = (
  workout: Workout,
  setWorkout: React.Dispatch<SetStateAction<Workout>>
) => {
  const navigate = useNavigate();
  const { data: muscles } = useMuscles();

  async function processWorkoutData(workout: Workout) {
    const { title, desc, price, muscleSlug, image, exercises } = workout;
    let imageURL = await useGetFileURL(image, "workoutImages");

    let titleSlug = slugify(title, { replacement: "-", lower: true });
    if (parseInt(price) <= 0) {
      return alert("Prețul antrenamentului trebuie să fie un număr pozitiv.");
    }
    const muscleDoc = muscles?.result.find((m) => m.data().slug === muscleSlug);
    const muscleGroup = muscleDoc?.data();
    return {
      title,
      desc,
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

    //set title of workout
    if (name === "title") {
      setWorkout((prev) => ({ ...prev, title: value }));
    }

    //set targeted muscle group
    else if (name === "muscle") {
      setWorkout((prev) => ({ ...prev, muscleSlug: value }));
    }

    //set description for workout
    else if (name === "description") {
      setWorkout((prev) => ({ ...prev, desc: value }));
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
