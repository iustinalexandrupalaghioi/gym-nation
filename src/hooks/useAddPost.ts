import {
  useState,
  createRef,
  ChangeEvent,
  RefObject,
  FormEvent,
  useRef,
} from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { queryClient } from "../main";
import slugify from "slugify";
import FirebaseClient from "../utilities/firebase-client";
import useCategories from "./useCategories";
import useGetFileURL from "./useGetFileURL";
import BlogPost from "../entities/BlogPost";
import showToast, { Method } from "../utilities/showToast";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
export interface PostErrors {
  title: string;
  image: string;
  category: string;
  value: string;
}
const useAddPost = () => {
  const [isLoading, setLoading] = useState(false);
  //managing state for blog inputs
  const [value, setValue] = useState("");
  const [post, setPost] = useState<BlogPost>({
    title: "",
    image: null,
    category: "",
  });
  const { data: categories } = useCategories();
  const navigate = useNavigate();
  const fileInputRefImage = useRef<FileUpload>(null);
  const selectInputRef = useRef<HTMLSelectElement>(null);

  const initialErrorState = {
    title: "",
    image: "",
    category: "",
    value: "",
  };
  const [postErrors, setPostErrors] = useState<PostErrors>(initialErrorState);
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

    if (!image) {
      setPostErrors((prev) => ({
        ...prev,
        image: "O imagine trebuie încărcată",
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

    let imageURL = image ? await useGetFileURL(image, "blogImages") : "";

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
      (c) => c.data().slug === categorySlug
    );

    const category = categoryDoc && categoryDoc.data();
    return {
      title: title,
      titleSlug: titleSlug,
      category: category,
      image: imageURL,
      htmlContent: value,
      textContent: textContent,
      createdAt: createdAt,
    };
  }

  //upload post to firebase function
  const firebaseClient = new FirebaseClient("/posts");
  async function postNewBlog(data: DocumentData) {
    try {
      await firebaseClient.post(data);
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (fileInputRefImage.current) {
        fileInputRefImage.current.setFiles([]);
      }
      if (selectInputRef.current) {
        selectInputRef.current.value = "";
      }
      showToast("Articolul a fost postat cu succes!", Method.Success, () =>
        navigate("/blog")
      );
    } catch (error: any) {
      console.error(error.message);
      showToast(
        "Articolul nu a putut fi publicat. Te rugam sa incerci mai tarziu.",
        Method.Error
      );
    }
  }

  //handle change events on form
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    if (name === "title") {
      setPost((prev) => ({ ...prev, title: value }));
    } else if (name === "category") {
      setPost((prev) => ({ ...prev, category: value }));
    }
  }

  const handleFileSelect = (event: FileUploadSelectEvent) => {
    const files = event.files;
    if (files && files.length > 0) {
      setPost((prev) => ({ ...prev, image: files[0] }));
    }
  };

  // reference quill
  const quillRef: React.RefObject<ReactQuill> = createRef<ReactQuill>();

  //handle form submit
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      event.preventDefault();
      const { title, category, image } = post;
      const data = await processData(image, quillRef, title, category, value);
      if (data) {
        postNewBlog(data);
        setPost({
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

  return {
    quillRef,
    post,
    value,
    setValue,
    setPost,
    setPostErrors,
    handleChange,
    handleFileSelect,
    handleSubmit,
    postErrors,
    isLoading,
    fileInputRefImage,
    selectInputRef,
  };
};
export default useAddPost;
