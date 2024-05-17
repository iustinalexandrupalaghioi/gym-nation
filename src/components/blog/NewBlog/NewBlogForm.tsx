import useAddPost from "../../../hooks/useAddPost";
import ReactQuill from "react-quill";
import useCategories from "../../../hooks/useCategories";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";

const NewBlogForm = () => {
  const { data: categories } = useCategories();
  const {
    quillRef,
    post: { title },
    value,
    setValue,
    handleChange,
    handleSubmit,
  } = useAddPost();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <div className="container px-4 py-5 vh-100">
      <form
        className="form card border-0 shadow p-4 rounded-4"
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-3">
          <label htmlFor="title">Titlul articolului</label>
          <input
            id="title"
            type="text"
            name="title"
            className="form-control"
            placeholder="Scrie un titlu pentru postarea ta"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="image">Adaugă o imagine reprezentativă</label>
          <input
            type="file"
            name="file"
            className="form-control"
            id="image"
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="category">Categorie</label>
          <select
            className="form-select"
            id="category"
            name="category"
            aria-label="Alege o categorie"
            onChange={handleChange}
          >
            <option value="">{"Alege o categorie din listă"}</option>
            {categories?.result.map(
              (option, index) =>
                option.data().slug !== "" && (
                  <option key={index} value={option.data().slug}>
                    {option.data().name}
                  </option>
                )
            )}
          </select>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor="quill">Conținutul articolului</label>
            <ReactQuill
              ref={quillRef}
              id="quill"
              className="blog-quill"
              modules={modules}
              formats={formats}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="container-fluid mt-3 d-flex justify-content-end gap-2">
          <Link to="/blog" className="btn btn-outline-primary btnOutline">
            Anulează
          </Link>
          <button className="btn btn-primary align-self-end text-light">
            Postează
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBlogForm;
