import useFetchWorkouts from "./useFetchWorkouts";

const useWorkout = (slug: string) => {
  const { data: workouts } = useFetchWorkouts();
  return workouts?.result.find((w) => w.data().titleSlug === slug);
};
export default useWorkout;
