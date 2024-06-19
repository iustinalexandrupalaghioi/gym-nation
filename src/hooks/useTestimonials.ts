import { useQuery } from "@tanstack/react-query";
import FirebaseClient from "../utilities/firebase-client";
import ms from "ms";
const firebaseClient = new FirebaseClient("reviews");
const useTestimonials = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => firebaseClient.get(),
    staleTime: ms("24ms"),
  });
};

export default useTestimonials;
