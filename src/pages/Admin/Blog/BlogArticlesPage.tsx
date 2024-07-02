import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import LoadingStatus from "../../../components/LoadingStatus";
import PageContent from "../../../components/dashboard/PageContent";

import useBlogQueryStore from "../../../stores/blogQueryStore";
import ErrorPage from "../../Client/ErrorPage";
import useCategories from "../../../hooks/Blog/useCategories";
import useFetchPosts from "../../../hooks/Blog/useFetchPosts";
import useFetchPostsNumber from "../../../hooks/Blog/useFetchPostsNumber";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import DeleteModal from "../../../components/dashboard/AdminWorkout/DeleteWorkoutModal";
import { MdEdit, MdRemoveRedEye } from "react-icons/md";

export const BlogArticlesPage = () => {
  const blogQueryStore = useBlogQueryStore();
  const { data: categories } = useCategories();
  const { data: posts, error, isLoading } = useFetchPosts("titleSlug");
  const { data: postsNumber } = useFetchPostsNumber(
    blogQueryStore.blogQuery.category && blogQueryStore.blogQuery.category
  );
  const [selectedCategory, setSelectedCategory] = useState(
    blogQueryStore.blogQuery.category
  );

  useEffect(() => {
    setSelectedCategory(blogQueryStore.blogQuery.category);
  }, [blogQueryStore.blogQuery.category]);

  if (error) return <ErrorPage />;

  return (
    <PageContent pageTitle="Articole de blog publicate">
      <div className="d-flex flex-column flex-md-row gap-2 align-items-center">
        <Link to="/admin/blog/new" className="btn btn-primary text-light my-2">
          Adaugă Articol Nou
        </Link>
        <select
          className="form-select border-0 w-50 shadow"
          name="category"
          value={selectedCategory}
          onChange={(event) => {
            setSelectedCategory(event.target.value);
            blogQueryStore.setCategory(event.target.value);
          }}
        >
          <option value="">Filtrează după categorie...</option>
          {categories?.result.map(
            (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) =>
              doc.data().slug && (
                <option key={doc.id} value={doc.data().slug}>
                  {doc.data().name}
                </option>
              )
          )}
        </select>
        <button
          className="btn btn-outline-info"
          onClick={() => blogQueryStore.setCategory("")}
        >
          Șterge Filtrarea
        </button>
      </div>
      {isLoading ? (
        <LoadingStatus />
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Titlu</th>
              <th>Categorie</th>
              <th>Data publicării</th>
              <th className="w-25">Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {posts?.result.map(
              (
                post: QueryDocumentSnapshot<DocumentData, DocumentData>,
                index: number
              ) => (
                <tr key={post.id}>
                  <td className="text-body-secondary">{index + 1}</td>
                  <td>{post.data().title}</td>
                  <td className="text-body-secondary">
                    {post.data().category.name}
                  </td>
                  <td className="text-body-secondary">
                    {post.data().createdAt}
                  </td>
                  <td>
                    <Link
                      title="Vezi articolul"
                      to={`/blog/${post.data().titleSlug}`}
                      className="btn btn-outline-info d-inline-flex align-items-center justify-content-center me-2"
                    >
                      <MdRemoveRedEye />
                    </Link>
                    <Link
                      title="Modifică articolul"
                      to={`/admin/blog/${post.data().titleSlug}/edit`}
                      className="btn btn-outline-info d-inline-flex align-items-center justify-content-center me-2"
                    >
                      <MdEdit />
                    </Link>
                    <DeleteModal
                      modalId={`deleteArticle-${post.data().titleSlug}`}
                      docId={post.id}
                      collection="/posts"
                      question="Ești sigur că vrei să ștergi acest articol?"
                      successMessage="Articol șters cu succes!"
                      errorMessage="Nu s-a putut efectua acțiunea de ștergere."
                      queryKey="posts"
                    />
                  </td>
                </tr>
              )
            )}
            <tr>
              <th>
                Total: <span className="fw-bold">{postsNumber?.count}</span>
              </th>
            </tr>
          </tbody>
        </table>
      )}
    </PageContent>
  );
};
