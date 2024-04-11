import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import ms from "ms";

const apiClient = new APIClient("/posts");

const useBlogPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  });
};

export default useBlogPosts;
