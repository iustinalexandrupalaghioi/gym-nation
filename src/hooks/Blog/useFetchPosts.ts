import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import FirebaseClient from "../../utilities/firebase-client";
import useBlogQueryStore from "../../stores/blogQueryStore";

const firebaseClient = new FirebaseClient("/posts");

const useFetchPosts = (orderByField?: string) => {
  const blogQuery = useBlogQueryStore((s) => s.blogQuery);
  return useQuery({
    queryKey: ["posts", blogQuery],
    queryFn: () =>
      blogQuery.category
        ? firebaseClient.get("category.slug", blogQuery.category, orderByField)
        : firebaseClient.get(undefined, undefined, orderByField),
    staleTime: ms("24h"),
  });
};

export default useFetchPosts;
