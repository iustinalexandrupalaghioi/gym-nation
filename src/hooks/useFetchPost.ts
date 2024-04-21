import { useQuery } from "@tanstack/react-query";
import APIClient from "../utilities/api-client";
import ms from "ms";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

const apiClient = new APIClient("posts");

const useFetchPost = (
  key: string,
  field: string,
  id: string | QueryDocumentSnapshot<DocumentData, DocumentData>
) => {
  return useQuery({
    queryKey: [key, id],
    queryFn: () => apiClient.get(field, id),
    staleTime: ms("24h"),
  });
};

export default useFetchPost;
