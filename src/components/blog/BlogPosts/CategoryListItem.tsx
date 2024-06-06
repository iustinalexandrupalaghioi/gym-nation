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
  const { data: posts } = useFetchPostsNumber(doc.data().slug);

  return (
    <li className="d-flex justify-content-between align-items-center mb-2">
      <Link
        to="/blog"
        className={`text-decoration-none ${
          category === doc.data().slug
            ? "active fw-bold text-light"
            : "text-body-secondary"
        }`}
        onClick={() => setCategory(doc.data().slug)}
      >
        {doc.data().name}
      </Link>
      <p className="text-primary fw-bold mb-0">{posts?.count}</p>
    </li>
  );
};

export default CategoryListItem;
