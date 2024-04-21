import { RefObject } from "react";
import ReactQuill from "react-quill";
import useImage from "../hooks/useImage";
import slugify from "slugify";

const processData = async (
  image: File | null,
  quillRef: RefObject<ReactQuill>,
  title: string,
  category: string,
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
  // Find category in database
  const categoryName = category;
  return {
    title: title,
    titleSlug: titleSlug,
    category: categoryName,
    image: imageURL,
    htmlContent: value,
    textContent: textContent,
    createdAt: createdAt,
  };
};
export default processData;
