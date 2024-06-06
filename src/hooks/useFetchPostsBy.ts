import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import useBlogQueryStore from "../utilities/blogQueryStore";
import FirebaseClient from "../utilities/firebase-client";
const firebaseClient = new FirebaseClient("/posts");

const useFetchPostsBy = (field: string, id: string) => {
  const blogQuery = useBlogQueryStore((s) => s.blogQuery);
  return useQuery({
    queryKey: ["posts", blogQuery],
    queryFn: () => {
      if (blogQuery.category) {
        return firebaseClient.get(field, id);
      } else {
        return firebaseClient.get();
      }
    },
    staleTime: ms("24h"),
  });
};

export default useFetchPostsBy;
