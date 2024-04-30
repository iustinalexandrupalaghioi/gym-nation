import { Dispatch, SetStateAction } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  blogQuillRef: React.RefObject<ReactQuill>;
}

const NewBlogQuill = ({ value, setValue, blogQuillRef }: Props) => {
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
  ];

  return (
    <div className="row">
      <div className="form-group">
        <label htmlFor="quill">Conținutul articolului</label>
        <ReactQuill
          ref={blogQuillRef}
          id="quill"
          className="blog-quill"
          modules={modules}
          formats={formats}
          theme="snow"
          value={value}
          onChange={setValue}
        />
      </div>
    </div>
  );
};

export default NewBlogQuill;
