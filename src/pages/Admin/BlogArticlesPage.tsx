import { Link } from "react-router-dom";
import PageContent from "../../components/dashboard/PageContent";
import useFetchPosts from "../../hooks/useFetchPosts";
import useFetchPostsNumber from "../../hooks/useFetchPostsNumber";
import ErrorPage from "../Client/ErrorPage";
import LoadingStatus from "../../components/LoadingStatus";
import { MdDeleteForever } from "react-icons/md";
import showToast, { Method } from "../../utilities/showToast";
import { queryClient } from "../../main";
import FirebaseClient from "../../utilities/firebase-client";
import useBlogQueryStore from "../../stores/blogQueryStore";
import useCategories from "../../hooks/useCategories";
import { useEffect, useState } from "react";
const firebaseClient = new FirebaseClient("/posts");
import { MdRemoveRedEye } from "react-icons/md";

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
            (doc) =>
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
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Titlu</th>
              <th>Categorie</th>
              <th>Data publicării</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {posts?.result.map((post, index) => (
              <tr key={post.id}>
                <td className="text-body-secondary">{index + 1}</td>
                <td>{post.data().title}</td>
                <td className="text-body-secondary">
                  {post.data().category.name}
                </td>
                <td className="text-body-secondary">{post.data().createdAt}</td>
                <td className="d-inline-flex gap-2">
                  <Link
                    title="Vezi articolul"
                    to={`/blog/${post.data().titleSlug}`}
                    className="btn btn-outline-info d-inline-flex align-items-center justify-content-center fs-5"
                  >
                    <MdRemoveRedEye />
                  </Link>
                  <button
                    title="Șterge articolul"
                    onClick={async () => {
                      const result = await firebaseClient.delete(post.id);
                      if (result) {
                        await queryClient.invalidateQueries({
                          queryKey: ["posts"],
                        });
                        showToast("Articol șters cu succes!", Method.Success);
                      } else {
                        showToast(
                          "Nu s-a putut efectua acțiunea de ștergere.",
                          Method.Error
                        );
                      }
                    }}
                    className="btn btn-outline-danger d-inline-flex align-items-center justify-content-center fs-5"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
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
