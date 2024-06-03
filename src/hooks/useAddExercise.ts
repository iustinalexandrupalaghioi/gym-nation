import { ChangeEvent, FormEvent, SetStateAction } from "react";
import slugify from "slugify";
import useImage from "./useImage";
import useVideo from "./useVideo";
import Workout from "../entities/Workout";
import Exercise from "../entities/Exercise";

const useAddExercise = (
  exercise: Exercise,
  setExercise: React.Dispatch<SetStateAction<Exercise>>,
  setWorkout: React.Dispatch<SetStateAction<Workout>>
) => {
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    if (name === "exerciseName") {
      setExercise((prev) => ({ ...prev, name: value }));
    } else if (name === "exerciseDescription") {
      setExercise((prev) => ({ ...prev, exerciseDescription: value }));
    } else if (
      event.target instanceof HTMLInputElement &&
      event.target.type === "file" &&
      name === "exerciseVideo"
    ) {
      const files = event.target.files;
      if (files && files.length > 0) {
        setExercise((prev) => ({ ...prev, video: files[0] }));
      }
    } else if (name === "linkExerciseVideo") {
      setExercise((prev) => ({ ...prev, videoURL: value }));
    } else if (
      event.target instanceof HTMLInputElement &&
      event.target.type === "file" &&
      name === "exerciseThubnail"
    ) {
      const files = event.target.files;
      if (files && files.length > 0) {
        setExercise((prev) => ({ ...prev, image: files[0] }));
      }
    }
  }

  async function processExercise(exercise: Exercise) {
    const { name, exerciseDescription, image, video, videoURL } = exercise;
    let imageURL = await useImage(image!, "workoutImages");
    let videoLink = await useVideo(video!, "exerciseVideos");
    let nameSlug = slugify(name, { replacement: "-", lower: true });
    return {
      name,
      nameSlug,
      exerciseDescription,
      imageURL,
      videoURL,
      videoLink,
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = await processExercise(exercise);

    if (data.name && data.exerciseDescription) {
      setWorkout((prev) => ({ ...prev, exercises: [...prev.exercises, data] }));
      alert("Exercitiul a fost adaugat cu succes!");

      setExercise({
        name: "",
        exerciseDescription: "",
        image: null,
        video: null,
      });
    } else {
      alert("Please fill in all exercise details.");
    }
  }

  return { exercise, handleChange, handleSubmit };
};

export default useAddExercise;
