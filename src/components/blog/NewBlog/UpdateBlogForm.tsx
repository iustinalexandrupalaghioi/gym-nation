import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import ReactQuill from "react-quill";
import useCategories from "../../../hooks/Blog/useCategories";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { useNavigate, useParams } from "react-router-dom";
import usePost from "../../../hooks/Blog/usePost";
import {
  ChangeEvent,
  FormEvent,
  RefObject,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import ErrorPage from "../../../pages/Client/ErrorPage";
import LoadingStatus from "../../LoadingStatus";
import { PostErrors } from "../../../hooks/Blog/useAddPost";
import slugify from "slugify";
import useGetFileURL from "../../../hooks/useGetFileURL";
import showToast, { Method } from "../../../utilities/showToast";
import { queryClient } from "../../../main";
import FirebaseClient from "../../../utilities/firebase-client";
import LoadingButton from "../../account/LoadingButton";
interface BlogPost {
  title: string;
  image: File | null;
  category: string;
}

const UpdateBlogForm = () => {
  const { data: categories } = useCategories();
  const { titleSlug } = useParams();
  const {
    data: articleDoc,
    error,
    isLoading,
  } = usePost("titleSlug", titleSlug!);
  const initialArticleData = articleDoc?.result[0].data();
  const [loadingStatus, setLoading] = useState(false);

  const [articleData, setArticleData] = useState<BlogPost>({
    title: "",
    image: null,
    category: "",
  });
  const [value, setValue] = useState("");

  const initialErrorState = {
    title: "",
    image: "",
    category: "",
    value: "",
  };
  const fileInputRefImage = useRef<FileUpload>(null);
  const selectInputRef = useRef<HTMLSelectElement>(null);
  const [postErrors, setPostErrors] = useState<PostErrors>(initialErrorState);
  const navigate = useNavigate();

  //process user inputs function
  async function processData(
    image: File | null,
    quillRef: RefObject<ReactQuill>,
    title: string,
    categorySlug: string,
    value: string
  ) {
    setPostErrors(initialErrorState);

    let hasError = false;

    if (!title) {
      setPostErrors((prev) => ({ ...prev, title: "Titlul este obligatoriu" }));
      hasError = true;
    }

    if (!categorySlug) {
      setPostErrors((prev) => ({
        ...prev,
        category: "Alege o categorie din listă sau adaugă una nouă.",
      }));
      hasError = true;
    }

    if (!value) {
      setPostErrors((prev) => ({
        ...prev,
        value: "Conținutul nu poate lipsi din articol",
      }));
      hasError = true;
    }

    if (hasError) {
      return null;
    }

    let imageURL = image && (await useGetFileURL(image, "blogImages"));

    let textContent = quillRef.current
      ? quillRef.current.getEditor().getText()
      : "";

    let date = new Date();
    let createdAt = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    let titleSlug = slugify(title, {
      replacement: "-",
      lower: true,
    });

    const categoryDoc = categories?.result.find(
      (c: QueryDocumentSnapshot<DocumentData, DocumentData>) =>
        c.data().slug === categorySlug
    );

    const category = categoryDoc && categoryDoc.data();
    return imageURL
      ? {
          title: title,
          titleSlug: titleSlug,
          category: category,
          image: imageURL,
          htmlContent: value,
          textContent: textContent,
          createdAt: createdAt,
        }
      : {
          title: title,
          titleSlug: titleSlug,
          category: category,
          htmlContent: value,
          textContent: textContent,
          createdAt: createdAt,
        };
  }
  //update post in firebase function
  const firebaseClient = new FirebaseClient("/posts");
  async function updateBlog(data: DocumentData) {
    try {
      await firebaseClient.update(articleDoc?.result[0].id!, data);
      await queryClient.refetchQueries({ queryKey: ["posts"] });
      if (fileInputRefImage.current) {
        fileInputRefImage.current.setFiles([]);
      }
      if (selectInputRef.current) {
        selectInputRef.current.value = "";
      }
      showToast("Articolul a fost actualizat cu succes!", Method.Success, () =>
        navigate("/admin/blog")
      );
    } catch (error: any) {
      console.error(error.message);
      showToast(
        "Articolul nu a putut fi actualizat. Te rugam sa incerci mai tarziu.",
        Method.Error
      );
    }
  }

  //handle change events on form
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setArticleData((prev) => ({ ...prev, [name]: value }));
  }

  const handleFileSelect = (event: FileUploadSelectEvent) => {
    const files = event.files;
    if (files && files.length > 0) {
      setArticleData((prev) => ({ ...prev, image: files[0] }));
    }
  };

  // reference quill
  const quillRef: React.RefObject<ReactQuill> = createRef<ReactQuill>();

  //handle form submit
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      event.preventDefault();
      const { title, category, image } = articleData;
      const data = await processData(image, quillRef, title, category, value);
      if (data) {
        updateBlog(data);
        setArticleData({
          title: "",
          image: null,
          category: "",
        });
        setValue("");
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (initialArticleData) {
      setArticleData({
        title: initialArticleData.title,
        image: null,
        category: initialArticleData.category.slug,
      });
      setValue(initialArticleData.htmlContent);
    }
  }, [articleDoc]);

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
  if (error) return <ErrorPage />;
  if (isLoading) return <LoadingStatus />;
  return (
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
          value={articleData.title}
          onChange={handleChange}
        />
        {postErrors.title && <p className="text-danger">{postErrors.title}</p>}
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
          ref={fileInputRefImage}
        />
        {postErrors.image && <p className="text-danger">{postErrors.image}</p>}
      </div>
      <div className="form-group mb-3">
        <label htmlFor="category" className="text-body-secondary">
          Categorie
        </label>
        <select
          className="form-select border-0"
          id="category"
          name="category"
          aria-label="Alege o categorie"
          value={articleData.category}
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
        {postErrors.category && (
          <p className="text-danger">{postErrors.category}</p>
        )}
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
          {postErrors.value && (
            <p className="text-danger">{postErrors.value}</p>
          )}
        </div>
      </div>
      <div className="container-fluid mt-3 d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-outline-info">
          Anulează
        </button>
        {loadingStatus ? (
          <LoadingButton
            textContent="Procesare..."
            styleClass="btn btn-primary text-light aling-self-end"
          />
        ) : (
          <button
            type="submit"
            className="btn btn-primary align-self-end text-light"
          >
            Salvează modificările
          </button>
        )}
      </div>
    </form>
  );
};

export default UpdateBlogForm;
