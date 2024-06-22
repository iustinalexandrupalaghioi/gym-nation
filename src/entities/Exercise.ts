export default interface Exercise {
  sectionId: string;
  exerciseName: string;
  exerciseDescription: string;
  nameSlug?: string;
  image?: File | null;
  imageURL?: string | null | undefined;
  video?: File | null;
  videoLink?: string | null | undefined;
}
