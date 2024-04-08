import { useState } from "react";
import NewBlogGrid from "../components/blog/NewBlogGrid";
import BlogQuill from "../components/blog/BlogQuill";
import NewBlogPreview from "../components/blog/NewBlogPreview";
import NewBlogButtons from "../components/blog/NewBlogButtons";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../db";
import NewBlogImage from "../components/blog/NewBlogTitleQuill";

const NewEditBlog = () => {
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");
  const handleSubmit = () => {
    addDoc(collection(db, "posts"), { image: image, content: value })
      .then(() => {
        alert("Articolul a fost postat cu succes!");
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
      <NewBlogImage image={image} setImage={setImage} />
      <BlogQuill value={value} setValue={setValue} />
      {value !== "" ? <NewBlogPreview value={value} /> : null}
      <NewBlogButtons handleSubmit={handleSubmit} />
    </NewBlogGrid>
  );
};

export default NewEditBlog;
