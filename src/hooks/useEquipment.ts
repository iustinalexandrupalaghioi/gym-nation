import { useQuery } from "@tanstack/react-query";
import FirebaseClient from "../utilities/firebase-client";
import ms from "ms";

const firebaseClient = new FirebaseClient("/equipment");
const useEquipment = () => {
  return useQuery({
    queryKey: ["equipment"],
    queryFn: firebaseClient.getAll,
    staleTime: ms("24h"),
  });
};
export default useEquipment;
