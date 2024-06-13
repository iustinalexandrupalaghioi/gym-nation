import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import useBlogQueryStore from "../stores/blogQueryStore";
import FirebaseClient from "../utilities/firebase-client";

const firebaseClient = new FirebaseClient("/posts");

const useFetchPosts = () => {
  const blogQuery = useBlogQueryStore((s) => s.blogQuery);
  return useQuery({
    queryKey: ["posts", blogQuery],
    queryFn: () => firebaseClient.get(),
    staleTime: ms("24h"),
  });
};

export default useFetchPosts;
