import { RefObject } from "react";
import ReactQuill from "react-quill";
import useImage from "./useImage";
import slugify from "slugify";

const useProcessData = async (
  image: File | null,
  blogQuillRef: RefObject<ReactQuill>,
  title: string,
  value: string
) => {
  let imageURL = await useImage(image);
  let textContent = blogQuillRef.current
    ? blogQuillRef.current.getEditor().getText()
    : null;
  let date = new Date();
  let createdAt = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  let slug = slugify(title, {
    replacement: "-",
    lower: true,
  });
  return {
    blogTitle: title,
    blogSlug: slug,
    imageSource: imageURL,
    blogContent: value,
    textContent: textContent,
    createdAt: createdAt,
  };
};
export default useProcessData;
