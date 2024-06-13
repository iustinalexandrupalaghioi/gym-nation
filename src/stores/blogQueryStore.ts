import { create } from "zustand";

interface blogQuery {
  category: string;
}

interface BlogQueryStore {
  blogQuery: blogQuery;
  setCategory: (category: string) => void;
}

const useBlogQueryStore = create<BlogQueryStore>((set) => ({
  blogQuery: { category: "" } as blogQuery,
  setCategory: (categorySlug) =>
    set(() => ({ blogQuery: { category: categorySlug } })),
}));

export default useBlogQueryStore;
