import { useQuery } from "@tanstack/react-query";
import APIClient from "../utilities/api-client";
import ms from "ms";

const apiClient = new APIClient("posts");

const useBlogPost = (id: string) => {
  return useQuery({
    queryKey: ["post"],
    queryFn: () => apiClient.get(id),
    staleTime: ms("24h"),
  });
};

export default useBlogPost;
