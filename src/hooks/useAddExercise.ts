import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
export interface Exercise {
  name: string;
  exerciseDescription: string;
  image: File | null;
  video: File | string | null;
}
const useAddExercise = () => {
  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    exerciseDescription: "",
    image: null,
    video: null,
  });
  const navigate = useNavigate();

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
      setExercise((prev) => ({ ...prev, video: value }));
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    navigate("/workouts");
  }

  return { exercise, handleChange, handleSubmit };
};

export default useAddExercise;
