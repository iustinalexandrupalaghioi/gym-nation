import { useQuery } from "@tanstack/react-query";
import FirebaseClient from "../utilities/firebase-client";
import ms from "ms";

const firebaseClient = new FirebaseClient("/muscles");

const useMuscles = () => {
  return useQuery({
    queryKey: ["muscles"],
    queryFn: firebaseClient.getAll,
    staleTime: ms("24h"),
  });
};
export default useMuscles;
