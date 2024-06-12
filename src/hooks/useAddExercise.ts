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

const useAddExercise = (
  setWorkout: React.Dispatch<SetStateAction<Workout>>
) => {
  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    exerciseDescription: "",
    image: null,
    video: null,
  });
  const fileInputRefImage = useRef<HTMLInputElement>(null);
  const fileInputRefVideo = useRef<HTMLInputElement>(null);

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

    // set  image  for exercise
    else if (
      event.target instanceof HTMLInputElement &&
      event.target.type === "file" &&
      name === "exerciseThubnail"
    ) {
      const files = event.target.files;
      if (files && files.length > 0) {
        setExercise((prev) => ({ ...prev, image: files[0] }));
      }
    }

    // set exercise video file
    else if (
      event.target instanceof HTMLInputElement &&
      event.target.type === "file" &&
      name === "exerciseVideo"
    ) {
      const files = event.target.files;
      if (files && files.length > 0) {
        setExercise((prev) => ({ ...prev, video: files[0] }));
      }
    }
  };

  const processExercise = async (exercise: Exercise) => {
    // take exercise object properties and provide name slug and links for images and videos
    const { name, exerciseDescription, image, video } = exercise;

    let imageURL = image ? await useGetFileURL(image!, "workoutImages") : "";
    let videoLink = video ? await useGetFileURL(video, "exerciseVideos") : "";
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
    event.preventDefault();
    const data = await processExercise(exercise);
    const { name, exerciseDescription, imageURL } = data;
    if (name && exerciseDescription && imageURL) {
      //set exercise for workout on submit
      setWorkout((prev) => ({ ...prev, exercises: [...prev.exercises, data] }));
      alert("Exercitiul a fost adaugat cu succes!");

      // clear state for exercise form
      setExercise({
        name: "",
        exerciseDescription: "",
        image: null,
        video: null,
      });

      if (fileInputRefImage.current) {
        fileInputRefImage.current.value = "";
      }

      if (fileInputRefVideo.current) {
        fileInputRefVideo.current.value = "";
      }
    } else {
      alert("Please fill in all exercise details.");
    }
  };

  return {
    exercise,
    fileInputRefImage,
    fileInputRefVideo,
    handleChange,
    handleSubmit,
  };
};

export default useAddExercise;
