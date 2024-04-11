import ReactQuill from "react-quill";
import { ChangeEvent, createRef, useState } from "react";
import useNewBlog from "../hooks/useNewBlog";
import NewBlogGrid from "../components/blog/NewBlogGrid";
import NewBlogPreview from "../components/blog/NewBlogPreview";
import NewBlogButtons from "../components/blog/NewBlogButtons";
import NewBlogQuill from "../components/blog/NewBlogQuill";
import NewBlogTitle from "../components/blog/NewBlogTitle";
import NewBlogImage from "../components/blog/NewBlogImageQuill";
import useProcessData from "../hooks/useProcessData";
import { useNavigate } from "react-router-dom";

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
  const blogQuillRef: React.RefObject<ReactQuill> = createRef<ReactQuill>();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    //pregatirea datelor pentru inserarea in baza de date
    const data = await useProcessData(
      post.image,
      blogQuillRef,
      post.title,
      value
    );
    //incarcarea articolului in baza de date
    useNewBlog(data).then(() => navigate("/blog"));
  };

  return (
    <NewBlogGrid>
      <NewBlogTitle
        title={post.title}
        handleChange={(event: ChangeEvent<HTMLInputElement>) =>
          setPost((prev) => ({ ...prev, title: event.target.value }))
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
      <NewBlogQuill
        blogQuillRef={blogQuillRef}
        value={value}
        setValue={setValue}
      />
      {value && <NewBlogPreview value={value} />}
      <NewBlogButtons handleSubmit={handleSubmit} />
    </NewBlogGrid>
  );
};

export default NewEditBlog;
