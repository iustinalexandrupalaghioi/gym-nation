import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import FirebaseClient from "../utilities/firebase-client";

const firebaseClient = new FirebaseClient("/categories");

const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: firebaseClient.getAll,
    staleTime: ms("24h"),
  });
};
export default useCategories;
