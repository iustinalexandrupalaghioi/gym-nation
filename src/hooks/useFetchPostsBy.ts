import { useQuery } from "@tanstack/react-query";
import APIClient from "../utilities/firebase-client";
import ms from "ms";
import useBlogQueryStore from "../utilities/blogQueryStore";

const apiClient = new APIClient("posts");

const useFetchPostsBy = (field: string, id: string) => {
  const blogQuery = useBlogQueryStore((s) => s.blogQuery);
  return useQuery({
    queryKey: ["posts", blogQuery],
    queryFn: () => {
      if (blogQuery.category) {
        return apiClient.get(field, id);
      } else {
        return apiClient.getAll();
      }
    },
    staleTime: ms("24h"),
  });
};

export default useFetchPostsBy;
