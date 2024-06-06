import { useQuery } from "@tanstack/react-query";
import FirebaseClient from "../utilities/firebase-client";
import ms from "ms";

const firebaseClient = new FirebaseClient("/workouts");
const useFetchWorkouts = () => {
  return useQuery({
    queryKey: ["workouts"],
    queryFn: firebaseClient.getAll,
    staleTime: ms("24h"),
  });
};
export default useFetchWorkouts;
