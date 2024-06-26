import { MdDeleteForever } from "react-icons/md";
import LoadingStatus from "../../../components/LoadingStatus";
import NewCategoryModal from "../../../components/blog/NewCategoryModal";
import PageContent from "../../../components/dashboard/PageContent";

import { queryClient } from "../../../main";
import FirebaseClient from "../../../utilities/firebase-client";
import showToast, { Method } from "../../../utilities/showToast";
import ErrorPage from "../../Client/ErrorPage";
import useCategories from "../../../hooks/Blog/useCategories";
import { DocumentData } from "firebase/firestore";

const firebaseClient = new FirebaseClient("/categories");
const CategoriesPage = () => {
  const { data: categories, error, isLoading } = useCategories();

  if (error) return <ErrorPage />;
  if (isLoading) return <LoadingStatus />;
  return (
    <PageContent pageTitle="Categoriile de Blog">
      <NewCategoryModal styleClass="btn btn-primary text-light my-2 d-flex gap-1 align-items-center" />
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Denumire</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {categories?.result.map(
            (category: DocumentData, index: number) =>
              category.data().slug && (
                <tr key={category.id}>
                  <td className="text-body-secondary">{index + 1}</td>
                  <td>{category.data().name}</td>
                  <td className="d-inline-flex gap-2">
                    <button
                      onClick={async () => {
                        const result = await firebaseClient.delete(category.id);
                        if (result) {
                          await queryClient.invalidateQueries({
                            queryKey: ["categories"],
                          });
                          showToast(
                            "Categorie ștearsă cu succes!",
                            Method.Success
                          );
                        } else {
                          showToast(
                            "Nu s-a putut efectua acțiunea de ștergere.",
                            Method.Error
                          );
                        }
                      }}
                      className="btn btn-outline-danger d-inline-flex align-items-center justify-content-center"
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </PageContent>
  );
};

export default CategoriesPage;
