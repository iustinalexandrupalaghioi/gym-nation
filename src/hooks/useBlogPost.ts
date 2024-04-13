import { useQuery } from "@tanstack/react-query";
import APIClient from "../utilities/api-client";

const apiClient = new APIClient("posts");

const useBlogPost = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => apiClient.get(id),
  });
};

export default useBlogPost;
