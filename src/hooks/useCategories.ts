import { useQuery } from "@tanstack/react-query";
import APIClient from "../utilities/api-client";
import ms from "ms";

const apiClient = new APIClient("/categories");

const useCategories = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => apiClient.getAll(),
    staleTime: ms("24h"),
  });
};
export default useCategories;
