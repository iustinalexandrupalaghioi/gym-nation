export default interface Exercise {
  name: string;
  exerciseDescription: string;
  image?: File | null;
  video?: File | null;
  videoURL?: string;
}
