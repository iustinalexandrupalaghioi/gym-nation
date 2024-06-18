import { useState, createRef, ChangeEvent, RefObject, FormEvent } from "react";
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

const useAddPost = () => {
  //managing state for blog inputs
  const [value, setValue] = useState("");
  const [post, setPost] = useState<BlogPost>({
    title: "",
    image: null,
    category: "",
  });
  const { data: categories } = useCategories();
  const navigate = useNavigate();

  //process user inputs function
  async function processData(
    image: File | null,
    quillRef: RefObject<ReactQuill>,
    title: string,
    categorySlug: string,
    value: string
  ) {
    let imageURL = await useGetFileURL(image, "blogImages");

    let textContent = quillRef.current
      ? quillRef.current.getEditor().getText()
      : null;

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
    const category = categoryDoc?.data();
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
    } else if (
      event.target instanceof HTMLInputElement &&
      event.target.type === "file"
    ) {
      const files = event.target.files;
      if (files && files.length > 0) {
        setPost((prev) => ({ ...prev, image: files[0] }));
      }
    }
  }

  // reference quill
  const quillRef: React.RefObject<ReactQuill> = createRef<ReactQuill>();

  //handle form submit
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { title, category, image } = post;
    const data = await processData(image, quillRef, title, category, value);
    postNewBlog(data);
  }

  return {
    quillRef,
    post,
    value,
    setValue,
    handleChange,
    handleSubmit,
  };
};
export default useAddPost;
