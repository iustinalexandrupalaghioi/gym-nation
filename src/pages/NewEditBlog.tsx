import NewBlogGrid from "../components/blog/NewBlogGrid";
import NewBlogPreview from "../components/blog/NewBlogPreview";
import NewBlogButtons from "../components/blog/NewBlogButtons";
import NewBlogQuill from "../components/blog/NewBlogQuill";
import NewBlogTitle from "../components/blog/NewBlogTitle";
import NewBlogImage from "../components/blog/NewBlogImageQuill";
import NewBlogCategory from "../components/blog/NewBlogCategory";
import useAddBlog from "../hooks/useAddBlog";

const NewEditBlog = () => {
  const {
    quillRef,
    post,
    value,
    setValue,
    handleTitleChange,
    handleCategoryChange,
    handleImageChange,
    handleSubmit,
  } = useAddBlog();

  return (
    <NewBlogGrid>
      <NewBlogTitle title={post.title} handleChange={handleTitleChange} />
      <NewBlogCategory handleChange={handleCategoryChange} />
      <NewBlogImage handleChange={handleImageChange} />
      <NewBlogQuill blogQuillRef={quillRef} value={value} setValue={setValue} />
      {value && <NewBlogPreview value={value} />}
      <NewBlogButtons handleSubmit={handleSubmit} />
    </NewBlogGrid>
  );
};

export default NewEditBlog;
