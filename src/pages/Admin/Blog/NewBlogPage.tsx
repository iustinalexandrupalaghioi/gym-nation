import { Navigate } from "react-router-dom";
import NewBlogForm from "../../../components/blog/NewBlog/NewBlogForm";
import NewBlogPreview from "../../../components/blog/NewBlog/NewBlogPreview";
import PageContent from "../../../components/dashboard/PageContent";

import useUserStatusStore from "../../../stores/userStore";
import useAddPost from "../../../hooks/Blog/useAddPost";

const NewBlogPage = () => {
  const isAdmin = useUserStatusStore((s) => s.userStatus.isAdmin);
  const {
    quillRef,
    post,
    value,
    setValue,
    handleChange,
    handleSubmit,
    handleFileSelect,
    postErrors,
    isLoading,
    fileInputRefImage,
    selectInputRef,
    setPost,
    setPostErrors,
  } = useAddPost();
  if (isAdmin) {
    return (
      <PageContent pageTitle="Scrie un nou articol de blog">
        <NewBlogForm
          setPost={setPost}
          setPostErrors={setPostErrors}
          quillRef={quillRef}
          fileInputRef={fileInputRefImage}
          selectInputRef={selectInputRef}
          handleFileSelect={handleFileSelect}
          post={post}
          value={value}
          setValue={setValue}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={postErrors}
          isLoading={isLoading}
        />
        {value && value != "<p><br></p>" && <NewBlogPreview value={value} />}
      </PageContent>
    );
  }
  return <Navigate to="/" />;
};

export default NewBlogPage;
