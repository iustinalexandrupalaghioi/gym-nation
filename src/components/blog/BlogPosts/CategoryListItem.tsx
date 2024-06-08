import { DocumentData } from "firebase/firestore";
import useBlogQueryStore from "../../../utilities/blogQueryStore";
import useFetchPostsNumber from "../../../hooks/useFetchPostsNumber";
import { Link } from "react-router-dom";
interface Props {
  doc: DocumentData;
}
const CategoryListItem = ({ doc }: Props) => {
  const blogStore = useBlogQueryStore();
  const {
    blogQuery: { category },
    setCategory,
  } = blogStore;

  const { slug, name } = doc.data();

  const { data: posts } = useFetchPostsNumber(doc.data().slug);
  const count = posts?.count;

  return (
    <li className="d-flex justify-content-between align-items-center mb-2">
      <Link
        to="/blog"
        className={`text-decoration-none ${
          category === slug
            ? "active fw-bold text-light"
            : "text-body-secondary"
        }`}
        onClick={() => setCategory(slug)}
      >
        {name}
      </Link>
      <p className="text-primary fw-bold mb-0">{count}</p>
    </li>
  );
};

export default CategoryListItem;
