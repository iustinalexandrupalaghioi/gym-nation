import { ChangeEvent, useRef, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { db } from "../db";
import NewBlogGrid from "../components/blog/NewBlogGrid";
import NewBlogPreview from "../components/blog/NewBlogPreview";
import NewBlogButtons from "../components/blog/NewBlogButtons";

import NewBlogQuill from "../components/blog/NewBlogQuill";
import NewBlogTitle from "../components/blog/NewBlogTitle";
import NewBlogImage from "../components/blog/NewBlogImageQuill";

const NewEditBlog = () => {
  const [post, setPost] = useState({ title: "" });
  const [image, setImage] = useState<File | null>(null);
  const [value, setValue] = useState("");

  const handleSubmit = async () => {
    let imageURL = "";
    const storage = getStorage();
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      imageURL = await getDownloadURL(storageRef);
    }

    addDoc(collection(db, "posts"), {
      blogTitle: post.title,
      imageSource: imageURL,
      blogContent: value,
    })
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
            setImage(files[0]);
          }
        }}
      />
      <NewBlogQuill value={value} setValue={setValue} />
      {value && <NewBlogPreview value={value} />}
      <NewBlogButtons handleSubmit={handleSubmit} />
    </NewBlogGrid>
  );
};

export default NewEditBlog;
