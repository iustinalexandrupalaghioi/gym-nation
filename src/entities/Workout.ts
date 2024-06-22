import Exercise from "./Exercise";

export interface Section {
  id: number;
  name: string;
  exercises: Exercise[];
}
export default interface Workout {
  title: string;
  workoutDescription: string;
  image: File | null;
  sections: Section[];
}
