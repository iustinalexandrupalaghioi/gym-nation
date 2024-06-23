import { DocumentData } from "firebase/firestore";

export default interface Exercise {
  sectionId: string;
  exerciseName: string;
  exerciseDescription: string;
  nameSlug?: string;
  muscleSlug?: string;
  muscleGroup?: DocumentData;
  video?: File | null;
  videoLink?: string | null | undefined;
}
