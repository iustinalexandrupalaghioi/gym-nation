import { useQuery } from "@tanstack/react-query";
import FirebaseClient from "../utilities/firebase-client";
import ms from "ms";

const firebaseClient = new FirebaseClient("/customers");
const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => firebaseClient.get(),
    staleTime: ms("24h"),
  });
};

export default useCustomers;
