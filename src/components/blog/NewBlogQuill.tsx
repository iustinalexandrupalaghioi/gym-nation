import { Dispatch, SetStateAction } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const NewBlogQuill = ({ value, setValue }: Props) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  // Add a new document in collection "cities"

  return (
    <div className="row my-5">
      <ReactQuill
        className="blog-quill"
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="Introdu conținutul articolului aici"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default NewBlogQuill;
