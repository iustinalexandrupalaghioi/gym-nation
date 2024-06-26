import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import FirebaseClient from "../../utilities/firebase-client";

const firebaseClient = new FirebaseClient("/posts");
const useFetchPostsNumber = (slug?: string) => {
  return useQuery({
    queryKey: ["postsNumber", slug],
    queryFn: () => {
      if (slug) {
        return firebaseClient.get("category.slug", slug);
      } else {
        return firebaseClient.get();
      }
    },
    staleTime: ms("24h"),
  });
};
export default useFetchPostsNumber;
