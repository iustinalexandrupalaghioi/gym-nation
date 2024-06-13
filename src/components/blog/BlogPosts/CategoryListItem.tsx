import { DocumentData } from "firebase/firestore";
import useBlogQueryStore from "../../../stores/blogQueryStore";
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

  const goToTop = () => {
    window.scrollTo(0, 0);
  };

  const { slug, name } = doc.data();

  const { data: posts } = useFetchPostsNumber(doc.data().slug);
  const count = posts?.count;

  return (
    <li className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
      <Link
        to="/blog"
        className={`text-decoration-none ${
          category === slug
            ? "active fw-bold text-light"
            : "text-body-secondary"
        }`}
        onClick={() => {
          setCategory(slug);
          goToTop();
        }}
      >
        {name}
      </Link>
      <p className="text-primary fw-bold mb-0">{count}</p>
    </li>
  );
};

export default CategoryListItem;
