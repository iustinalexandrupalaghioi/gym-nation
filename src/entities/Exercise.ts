export default interface Exercise {
  name: string;
  exerciseDescription: string;
  nameSlug?: string;
  image?: File | null;
  video?: File | null;
  videoLink?: string;
}
