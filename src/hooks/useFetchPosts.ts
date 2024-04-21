import { useQuery } from "@tanstack/react-query";
import APIClient from "../utilities/api-client";
import ms from "ms";
import useBlogQueryStore from "../utilities/blogQueryStore";

const apiClient = new APIClient("/posts");

const useFetchPosts = () => {
  const blogQuery = useBlogQueryStore((s) => s.blogQuery);
  return useQuery({
    queryKey: ["posts", blogQuery],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });
};

export default useFetchPosts;
