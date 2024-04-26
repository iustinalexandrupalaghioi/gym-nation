import { useState, createRef, ChangeEvent, RefObject } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import APIClient from "../utilities/firebase-client";
import { DocumentData } from "firebase/firestore";
import { queryClient } from "../main";
import slugify from "slugify";
import useCategory from "./useCategory";
import useImage from "./useImage";

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

  //process data user inputs
  const processData = async (
    image: File | null,
    quillRef: RefObject<ReactQuill>,
    title: string,
    categorySlug: string,
    value: string
  ) => {
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
  };

  //upload post
  const apiClient = new APIClient("/posts");
  const postNewBlog = async (data: DocumentData) => {
    await apiClient
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
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
  };

  // reference quill
  const quillRef: React.RefObject<ReactQuill> = createRef<ReactQuill>();

  const handleSubmit = async () => {
    //pregatirea datelor pentru inserarea in baza de date
    const data = await processData(
      post.image,
      quillRef,
      post.title,
      post.category,
      value
    );

    //incarcarea articolului in baza de date
    postNewBlog(data).then(() => navigate("/blog"));
  };

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
