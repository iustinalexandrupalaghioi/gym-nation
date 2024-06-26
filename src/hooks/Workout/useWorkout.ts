import { useQuery } from "@tanstack/react-query";
import FirebaseClient from "../utilities/firebase-client";
import ms from "ms";

const firebaseClient = new FirebaseClient("/workouts");
const useWorkout = (field: string, slug: string) => {
  return useQuery({
    queryKey: ["workout", slug],
    queryFn: () => firebaseClient.get(field, slug),
    staleTime: ms("24h"),
  });
};
export default useWorkout;
