import useCategories from "./useCategories";

const useCategory = (slug: string) => {
  const { data: categories } = useCategories();
  return categories?.find((category) => category.data().slug === slug);
};
export default useCategory;
