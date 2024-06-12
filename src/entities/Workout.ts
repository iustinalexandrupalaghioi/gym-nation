import Exercise from "./Exercise";

export default interface Workout {
  title: string;
  workoutDescription: string;
  price: string;
  muscleSlug: string;
  image: File | null;
  exercises: Exercise[];
}
