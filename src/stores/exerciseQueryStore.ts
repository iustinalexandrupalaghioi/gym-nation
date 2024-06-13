import { create } from "zustand";
import Exercise from "../entities/Exercise";

interface exerciseQuery {
  exercise: Exercise;
}

interface ExerciseQueryStore {
  exerciseQuery: exerciseQuery;
  setExercise: (exercise: Exercise) => void;
}

const useExerciseQueryStore = create<ExerciseQueryStore>((set) => ({
  exerciseQuery: { exercise: {} as Exercise } as exerciseQuery,
  setExercise: (exercise) =>
    set(() => ({ exerciseQuery: { exercise: exercise } })),
}));

export default useExerciseQueryStore;
