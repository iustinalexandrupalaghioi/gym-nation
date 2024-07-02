import LoadingStatus from "../../../components/LoadingStatus";
import NewCategoryModal from "../../../components/blog/NewCategoryModal";
import PageContent from "../../../components/dashboard/PageContent";

import ErrorPage from "../../Client/ErrorPage";
import useCategories from "../../../hooks/Blog/useCategories";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import UpdateCategoryModal from "../../../components/blog/UpdateCategoryModal";
import DeleteModal from "../../../components/dashboard/AdminWorkout/DeleteWorkoutModal";

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
            (
              category: QueryDocumentSnapshot<DocumentData, DocumentData>,
              index: number
            ) =>
              category.data().slug && (
                <tr key={category.id}>
                  <td className="text-body-secondary">{index + 1}</td>
                  <td>{category.data().name}</td>
                  <td className="d-inline-flex gap-2">
                    <UpdateCategoryModal
                      modalId={`updateCategory-${category.data().slug}`}
                      category={category}
                    />

                    <DeleteModal
                      modalId={`deleteCategory-${category.data().slug}`}
                      docId={category.id}
                      collection="/categories"
                      queryKey="categories"
                      question="Ești sigur că vrei să ștergi această categorie?"
                      successMessage="Categoria a fost ștearsă cu succes"
                      errorMessage="Nu s-a putut efectua acțiunea de ștergere"
                    />
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
