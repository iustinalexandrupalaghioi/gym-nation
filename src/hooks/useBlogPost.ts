import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient("posts");

const useBlogPost = (id: string) => {
  return useQuery({
    queryKey: ["article"],
    queryFn: () => apiClient.get(id),
  });
};

export default useBlogPost;
