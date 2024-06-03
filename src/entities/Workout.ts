export default interface Workout {
  title: string;
  desc: string;
  muscleSlug: string;
  image: File | null;
  exercises: any[];
}
