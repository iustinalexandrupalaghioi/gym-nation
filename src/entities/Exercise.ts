export default interface Exercise {
  name: string;
  nameSlug?: string;
  exerciseDescription: string;
  image?: File | null;
  video?: File | null;
  videoLink?: string;
}
