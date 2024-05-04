import NewBlogButtons from "../components/blog/NewBlog/NewBlogButtons";
import NewBlogCategory from "../components/blog/NewBlog/NewBlogCategory";
import NewBlogImage from "../components/blog/NewBlog/NewBlogImage";
import NewBlogPreview from "../components/blog/NewBlog/NewBlogPreview";
import NewBlogQuill from "../components/blog/NewBlog/NewBlogQuill";
import NewBlogTitle from "../components/blog/NewBlog/NewBlogTitle";
import useAddPost from "../hooks/useAddPost";
import NewItemForm from "../components/blog/NewBlog/NewItemForm";

const NewEditBlog = () => {
  const { quillRef, post, value, setValue, handleChange, handleSubmit } =
    useAddPost();

  return (
    <NewItemForm>
      <NewBlogTitle title={post.title} handleChange={handleChange} />
      <NewBlogCategory handleChange={handleChange} />
      <NewBlogImage handleChange={handleChange} />
      <NewBlogQuill blogQuillRef={quillRef} value={value} setValue={setValue} />
      {value && <NewBlogPreview value={value} />}
      <NewBlogButtons handleSubmit={handleSubmit} />
    </NewItemForm>
  );
};

export default NewEditBlog;
