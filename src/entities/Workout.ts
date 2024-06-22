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
  image: File | null;
  sections: Section[];
}
