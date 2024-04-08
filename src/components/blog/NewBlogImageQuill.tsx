import { Dispatch, SetStateAction } from "react";
import ReactQuill from "react-quill";

interface Props {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}
const NewBlogImage = ({ image, setImage }: Props) => {
  const modules = {
    toolbar: [["image"]],
  };
  const formats = ["image"];

  return (
    <div className="row my-3">
      <h3>Adaugă o imagine reprezentativă pentru articolul tău</h3>
      <ReactQuill
        className="blog-quill"
        modules={modules}
        formats={formats}
        theme="snow"
        value={image}
        onChange={setImage}
      />
    </div>
  );
};

export default NewBlogImage;
