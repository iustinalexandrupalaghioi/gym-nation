import Exercise from "./Exercise";

export interface Section {
  id: number;
  name: string;
  exercises: Exercise[];
}
export default interface Workout {
  title: string;
  workoutDescription: string;
  price: string;
  muscleSlug: string;
  image: File | null;
  sections: Section[];
}
