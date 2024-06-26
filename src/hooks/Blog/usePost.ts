import { useQuery } from "@tanstack/react-query";
import FirebaseClient from "../utilities/firebase-client";
import ms from "ms";

const firebaseClient = new FirebaseClient("/posts");
const usePost = (field: string, slug: string) => {
  // const { data: posts } = useFetchPosts();
  // return posts?.result.find((p) => p.data().titleSlug === slug);
  return useQuery({
    queryKey: ["article", slug],
    queryFn: () => firebaseClient.get(field, slug),
    staleTime: ms("24h"),
  });
};
export default usePost;
