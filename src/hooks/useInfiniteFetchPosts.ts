import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import useBlogQueryStore from "../stores/blogQueryStore";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  orderBy,
  query,
  startAfter,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase-config";

const useInfiniteFetchPosts = () => {
  const categorySlug = useBlogQueryStore((s) => s.blogQuery.category);

  return useInfiniteQuery({
    queryKey: ["posts", categorySlug],
    queryFn: async ({
      pageParam = null,
    }: {
      pageParam?: QueryDocumentSnapshot<DocumentData> | null;
    }) => {
      let queryString;

      if (categorySlug) {
        queryString = !pageParam
          ? query(
              collection(db, "posts"),
              where("category.slug", "==", categorySlug),
              orderBy("title" && "category.slug"),
              limit(5)
            )
          : query(
              collection(db, "posts"),
              where("category.slug", "==", categorySlug),
              orderBy("title" && "category.slug"),
              startAfter(pageParam),
              limit(5)
            );
      } else {
        queryString = !pageParam
          ? query(collection(db, "posts"), orderBy("title"), limit(5))
          : query(
              collection(db, "posts"),
              orderBy("title"),
              startAfter(pageParam),
              limit(5)
            );
      }

      const response = await getDocs(queryString);
      const result = response.docs;

      return {
        posts: result,
        lastVisiblePost: result.length > 0 ? result[result.length - 1] : null,
      };
    },
    getNextPageParam: (lastPage) => lastPage.lastVisiblePost,
    staleTime: ms("24h"),
    initialPageParam: null,
  });
};

export default useInfiniteFetchPosts;
