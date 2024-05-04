import { useState, createRef, ChangeEvent, RefObject } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { queryClient } from "../main";
import slugify from "slugify";
import useCategory from "./useCategory";
import useImage from "./useImage";
import FirebaseClient from "../utilities/firebase-client";

interface BlogPost {
  title: string;
  image: File | null;
  category: string;
}
const useAddPost = () => {
  //managing state for blog inputs
  const [value, setValue] = useState("");
  const [post, setPost] = useState<BlogPost>({
    title: "",
    image: null,
    category: "",
  });
  const navigate = useNavigate();

  //process user inputs function
  async function processData(
    image: File | null,
    quillRef: RefObject<ReactQuill>,
    title: string,
    categorySlug: string,
    value: string
  ) {
    let imageURL = await useImage(image);

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

    const category = useCategory(categorySlug);
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
    await firebaseClient
      .post(data)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        alert("Articolul a fost postat cu succes!");
      })
      .catch((err) => {
        console.error(err.message);
        alert(
          "Articolul nu a putut fi publicat. Te rugam sa incerci mai tarziu."
        );
      });
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
  async function handleSubmit() {
    const { title, category, image } = post;
    const data = await processData(image, quillRef, title, category, value);
    postNewBlog(data).then(() => navigate("/blog"));
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
