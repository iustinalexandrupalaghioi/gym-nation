import NewBlogButtons from "../components/blog/NewBlog/NewBlogButtons";
import NewBlogCategory from "../components/blog/NewBlog/NewBlogCategory";
import NewBlogGrid from "../components/blog/NewBlog/NewBlogGrid";
import NewBlogImage from "../components/blog/NewBlog/NewBlogImage";
import NewBlogPreview from "../components/blog/NewBlog/NewBlogPreview";
import NewBlogQuill from "../components/blog/NewBlog/NewBlogQuill";
import NewBlogTitle from "../components/blog/NewBlog/NewBlogTitle";
import useAddPost from "../hooks/useAddPost";

const NewEditBlog = () => {
  const { quillRef, post, value, setValue, handleChange, handleSubmit } =
    useAddPost();

  return (
    <NewBlogGrid>
      <NewBlogTitle title={post.title} handleChange={handleChange} />
      <NewBlogCategory handleChange={handleChange} />
      <NewBlogImage handleChange={handleChange} />
      <NewBlogQuill blogQuillRef={quillRef} value={value} setValue={setValue} />
      {value && <NewBlogPreview value={value} />}
      <NewBlogButtons handleSubmit={handleSubmit} />
    </NewBlogGrid>
  );
};

export default NewEditBlog;
