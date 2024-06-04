export default interface Workout {
  title: string;
  desc: string;
  price: string;
  muscleSlug: string;
  image: File | null;
  exercises: any[];
}
