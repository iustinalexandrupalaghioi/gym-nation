import { useQuery } from "@tanstack/react-query";
import APIClient from "../utilities/api-client";
import ms from "ms";

const apiClient = new APIClient("/posts");
const useFetchPostsNumber = (slug: string) => {
  return useQuery({
    queryKey: ["postsNumber", slug],
    queryFn: () => {
      if (slug) {
        return apiClient.get("category.slug", slug);
      } else {
        return apiClient.getAll();
      }
    },
    staleTime: ms("24h"),
  });
};
export default useFetchPostsNumber;
