import ReactQuill from "react-quill";
import { ChangeEvent, createRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { uploadImage } from "../services/firebase-storage";
import { db } from "../db";

import NewBlogGrid from "../components/blog/NewBlogGrid";
import NewBlogPreview from "../components/blog/NewBlogPreview";
import NewBlogButtons from "../components/blog/NewBlogButtons";
import NewBlogQuill from "../components/blog/NewBlogQuill";
import NewBlogTitle from "../components/blog/NewBlogTitle";
import NewBlogImage from "../components/blog/NewBlogImageQuill";

const NewEditBlog = () => {
  const redirect = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [value, setValue] = useState("");

  const blogQuillRef: React.RefObject<ReactQuill> = createRef<ReactQuill>();
  const storage = getStorage();
  const path = `blogImages/${image?.name}`;
  let date = new Date();

  const handleSubmit = async () => {
    const imageURL = await uploadImage(image, storage, path);
    let textContent = "";
    if (blogQuillRef.current) {
      const quill = blogQuillRef.current.getEditor(); // Get the Quill instance
      // Get the text content
      textContent = quill.getText();
    } else {
      console.error("React Quill reference not available");
    }

    addDoc(collection(db, "posts"), {
      blogTitle: title,
      imageSource: imageURL,
      blogContent: value,
      textContent: textContent,
      createdAt: `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`,
    })
      .then(() => {
        alert("Articolul a fost postat cu succes!");
        redirect("/blog");
      })
      .catch((err) => {
        console.error(err.message);
        alert(
          "Articolul nu a putut fi publicat. Te rugam sa incerci mai tarziu."
        );
      });
  };

  return (
    <NewBlogGrid>
      <NewBlogTitle
        title={title}
        handleChange={(event: ChangeEvent<HTMLInputElement>) =>
          setTitle(event.target.value)
        }
      />
      <NewBlogImage
        handleChange={(event: ChangeEvent<HTMLInputElement>) => {
          const files = event.target.files;
          if (files && files.length > 0) {
            setImage(files[0]);
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
