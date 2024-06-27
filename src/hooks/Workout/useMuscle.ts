import { useQuery } from "@tanstack/react-query";
import FirebaseClient from "../../utilities/firebase-client";
import ms from "ms";
const firebaseClient = new FirebaseClient("/muscles");
const useMuscle = (slug: string) => {
  return useQuery({
    queryKey: ["muscle", slug],
    queryFn: () => firebaseClient.get("slug", slug),
    staleTime: ms("24h"),
  });
};
export default useMuscle;
