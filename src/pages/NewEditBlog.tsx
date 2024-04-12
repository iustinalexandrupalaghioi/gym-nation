import ReactQuill from "react-quill";
import { ChangeEvent, createRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import postNewBlog from "../utilities/postNewBlog";
import processData from "../utilities/processData";

import NewBlogGrid from "../components/blog/NewBlogGrid";
import NewBlogPreview from "../components/blog/NewBlogPreview";
import NewBlogButtons from "../components/blog/NewBlogButtons";
import NewBlogQuill from "../components/blog/NewBlogQuill";
import NewBlogTitle from "../components/blog/NewBlogTitle";
import NewBlogImage from "../components/blog/NewBlogImageQuill";
import NewBlogCategory from "../components/blog/NewBlogCategory";
import ErrorPage from "./ErrorPage";

interface BlogPost {
  title: string;
  image: File | null;
  category: string;
}

const NewEditBlog = () => {
  const [value, setValue] = useState("");
  const [post, setPost] = useState<BlogPost>({
    title: "",
    image: null,
    category: "",
  });

  const quillRef: React.RefObject<ReactQuill> = createRef<ReactQuill>();
  const navigate = useNavigate();

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

  return (
    <NewBlogGrid>
      <NewBlogTitle
        title={post.title}
        handleChange={(event: ChangeEvent<HTMLInputElement>) =>
          setPost((prev) => ({ ...prev, title: event.target.value }))
        }
      />
      <NewBlogCategory
        setCategory={(event: ChangeEvent<HTMLSelectElement>) =>
          setPost((prev) => ({ ...prev, category: event.target.value }))
        }
      />
      <NewBlogImage
        handleChange={(event: ChangeEvent<HTMLInputElement>) => {
          const files = event.target.files;
          if (files && files.length > 0) {
            setPost((prev) => ({ ...prev, image: files[0] }));
          }
        }}
      />
      <NewBlogQuill blogQuillRef={quillRef} value={value} setValue={setValue} />
      {value && <NewBlogPreview value={value} />}
      <NewBlogButtons handleSubmit={handleSubmit} />
    </NewBlogGrid>
  );
};

export default NewEditBlog;
