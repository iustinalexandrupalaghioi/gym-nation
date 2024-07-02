import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ChangeEvent, FormEvent, RefObject, SetStateAction } from "react";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import BlogPost from "../../../entities/BlogPost";
import ToastAlert from "../../ToastAlert";
import LoadingButton from "../../account/LoadingButton";
import { PostErrors } from "../../../hooks/Blog/useAddPost";
import useCategories from "../../../hooks/Blog/useCategories";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

interface Props {
  quillRef: RefObject<ReactQuill>;
  post: BlogPost;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleFileSelect: (event: FileUploadSelectEvent) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  selectInputRef: RefObject<HTMLSelectElement>;
  fileInputRef: RefObject<FileUpload>;
  errors: PostErrors;
  isLoading: boolean;
  setPostErrors: React.Dispatch<SetStateAction<PostErrors>>;
  setPost: React.Dispatch<SetStateAction<BlogPost>>;
}
const NewBlogForm = ({
  quillRef,
  post: { title },
  value,
  setValue,
  handleChange,
  handleSubmit,
  handleFileSelect,
  fileInputRef,
  selectInputRef,
  errors,
  isLoading,
  setPost,
  setPostErrors,
}: Props) => {
  const { data: categories } = useCategories();
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
    <div className="container-fluid px-md-4 py-md-5 p-0">
      <ToastAlert />
      <form
        className="form bg-body-tertiary shadow p-4 rounded-4"
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-3">
          <label htmlFor="title" className="text-body-secondary">
            Titlul articolului
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="form-control border-0"
            placeholder="Scrie un titlu pentru postarea ta"
            value={title}
            onChange={handleChange}
          />
          {errors.title && <p className="text-danger">{errors.title}</p>}
        </div>

        <div className="form-group mb-3">
          <FileUpload
            className="btn btn-dark"
            mode="basic"
            name="image"
            accept="image/*"
            maxFileSize={1000000}
            chooseLabel="&nbsp;Încarcă o imagine"
            onSelect={handleFileSelect}
            ref={fileInputRef}
          />
          {errors.image && <p className="text-danger">{errors.image}</p>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="category" className="text-body-secondary">
            Categorie
          </label>
          <select
            ref={selectInputRef}
            className="form-select border-0"
            id="category"
            name="category"
            aria-label="Alege o categorie"
            onChange={handleChange}
          >
            <option value="">{"Alege o categorie din listă"}</option>
            {categories?.result.map(
              (
                option: QueryDocumentSnapshot<DocumentData, DocumentData>,
                index: number
              ) =>
                option.data().slug !== "" && (
                  <option key={index} value={option.data().slug}>
                    {option.data().name}
                  </option>
                )
            )}
          </select>
          {errors.category && <p className="text-danger">{errors.category}</p>}
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor="quill" className="text-body-secondary">
              Conținutul articolului
            </label>
            <ReactQuill
              ref={quillRef}
              id="quill"
              className="blog-quill bg-dark"
              modules={modules}
              formats={formats}
              theme="snow"
              value={value}
              onChange={setValue}
            />
            {errors.value && <p className="text-danger">{errors.value}</p>}
          </div>
        </div>
        <div className="container-fluid mt-3 d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-outline-info"
            onClick={() => {
              setPost({
                title: "",
                category: "",
                image: null,
                imageURL: "",
                titleSlug: "",
                createdAt: "",
              });
              setPostErrors({ title: "", category: "", image: "", value: "" });
              setValue("");
            }}
          >
            Anulează
          </button>
          {isLoading ? (
            <LoadingButton
              styleClass="btn btn-primary align-self-end text-light"
              textContent="Procesare..."
            />
          ) : (
            <button className="btn btn-primary align-self-end text-light">
              Postează
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewBlogForm;
