export default interface Exercise {
  name: string;
  exerciseDescription: string;
  nameSlug?: string;
  image?: File | null;
  imageURL?: string | null | undefined;
  video?: File | null;
  videoLink?: string | null | undefined;
}
