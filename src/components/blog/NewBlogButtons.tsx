import { Link } from "react-router-dom";

interface Props {
  handleSubmit: () => void;
}
const NewBlogButtons = ({ handleSubmit }: Props) => {
  return (
    <div className="container-fluid pt-2 d-flex justify-content-end gap-2">
      <Link to="/blog" className="btn btn-outline-primary btnOutline">
        Anulează
      </Link>
      <button
        className="btn btn-primary align-self-end text-light"
        onClick={handleSubmit}
      >
        Postează
      </button>
    </div>
  );
};

export default NewBlogButtons;
