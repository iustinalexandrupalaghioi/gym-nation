interface ExerciseFilter {
  beginner: string;
  intermediate: string;
  expert: string;
}

interface EquipmentFilter {
  barbell: string;
  dumbbells: string;
  ezBar: string;
  kettlebell: string;
  bench: string;
  chestPressMachine: string;
  // Altele pot fi adăugate după nevoie
}

interface MuscleGroupFilter {
  biceps: string;
  triceps: string;
  chest: string;
  back: string;
  legs: string;
  abs: string;
  stretching: string;
  warmUp: string;
  lats: string;
  hamstring: string;
  calves: string;
  quadriceps: string;
  trapezius: string;
  shoulders: string;
  glutes: string;
  // Altele pot fi adăugate după nevoie
}

// O interfață pentru filtrele complete
interface WorkoutFilters {
  exercise: ExerciseFilter;
  equipment: EquipmentFilter;
  muscleGroup: MuscleGroupFilter;
}

// Exemplu de utilizare
const filters: WorkoutFilters = {
  exercise: {
    beginner: "Beginner",
    intermediate: "Intermediate",
    expert: "Expert",
  },
  equipment: {
    barbell: "Barbell",
    dumbbells: "Dumbbells",
    ezBar: "EZ-bar",
    kettlebell: "Kettlebell",
    bench: "Bench",
    chestPressMachine: "Chest press machine",
    // Se completează după nevoie
  },
  muscleGroup: {
    biceps: "Biceps",
    triceps: "Triceps",
    chest: "Chest",
    back: "Back",
    legs: "Legs",
    abs: "Abs",
    stretching: "Stretching",
    warmUp: "Warm Up",
    lats: "Lats",
    hamstring: "Hamstring",
    calves: "Calves",
    quadriceps: "Quadriceps",
    trapezius: "Trapezius",
    shoulders: "Shoulders",
    glutes: "Glutes",
    // Se completează după nevoie
  },
};
