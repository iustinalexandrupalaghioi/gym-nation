import { useQuery } from "@tanstack/react-query";
import FirebaseClient from "../utilities/firebase-client";
import ms from "ms";

const firebaseClient = new FirebaseClient("intensity-levels");
const useIntensityLevels = () => {
  return useQuery({
    queryKey: ["intensity"],
    queryFn: firebaseClient.getAll,
    staleTime: ms("24h"),
  });
};
export default useIntensityLevels;
