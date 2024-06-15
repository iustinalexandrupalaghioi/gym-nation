import { Navigate } from "react-router-dom";
import NewBlogForm from "../../components/blog/NewBlog/NewBlogForm";
import PageContent from "../../components/dashboard/PageContent";
import useUserStatusStore from "../../stores/userStore";

const NewBlogPage = () => {
  const isAdmin = useUserStatusStore((s) => s.userStatus.isAdmin);

  if (isAdmin) {
    return (
      <PageContent pageTitle="Scrie un nou articol de blog">
        <NewBlogForm />
      </PageContent>
    );
  }
  return <Navigate to="/" />;
};

export default NewBlogPage;
