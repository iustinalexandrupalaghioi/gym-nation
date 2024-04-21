import useCategories from "./useCategories";

const useCategory = (slug: string) => {
  const { data: categories } = useCategories();
  return categories?.result.find((c) => c.data().slug === slug);
};
export default useCategory;
