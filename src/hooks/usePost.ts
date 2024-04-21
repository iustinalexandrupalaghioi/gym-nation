import useFetchPosts from "./useFetchPosts";

const usePost = (slug: string) => {
  const { data: posts } = useFetchPosts();
  return posts?.result.find((p) => p.data().titleSlug == slug);
};
export default usePost;
