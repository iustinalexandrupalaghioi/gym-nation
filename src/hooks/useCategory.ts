import categoriiArticole from "../data/blogs";

const useCategory = (slug: string) => {
  return categoriiArticole.find((c) => c.slug === slug);
};
export default useCategory;
