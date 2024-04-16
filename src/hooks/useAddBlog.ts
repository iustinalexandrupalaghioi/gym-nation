import { useState, createRef, ChangeEvent } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import postNewBlog from "../utilities/postNewBlog";
import processData from "../utilities/processData";

interface BlogPost {
  title: string;
  image: File | null;
  category: string;
}
const useAddBlog = () => {
  //managing state for blog
  const [value, setValue] = useState("");
  const [post, setPost] = useState<BlogPost>({
    title: "",
    image: null,
    category: "",
  });
  const navigate = useNavigate();

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
export default useAddBlog;
