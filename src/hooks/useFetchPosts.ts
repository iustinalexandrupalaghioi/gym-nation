import { useQuery } from "@tanstack/react-query";
import APIClient from "../utilities/firebase-client";
import ms from "ms";
import useBlogQueryStore from "../utilities/blogQueryStore";

const apiClient = new APIClient("/posts");

const useFetchPosts = () => {
  const category = useBlogQueryStore((s) => s.category);
  return useQuery({
    queryKey: ["posts", category],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });
};

export default useFetchPosts;
