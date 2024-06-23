import PageContent from "../../components/dashboard/PageContent";
import useCategories from "../../hooks/useCategories";
import ErrorPage from "../Client/ErrorPage";
import LoadingStatus from "../../components/LoadingStatus";
import NewCategoryModal from "../../components/blog/Categories/NewCategoryModal";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import FirebaseClient from "../../utilities/firebase-client";
import showToast, { Method } from "../../utilities/showToast";
import { queryClient } from "../../main";
const firebaseClient = new FirebaseClient("/categories");
const CategoriesPage = () => {
  const { data: categories, error, isLoading } = useCategories();

  if (error) return <ErrorPage />;
  if (isLoading) return <LoadingStatus />;
  return (
    <PageContent pageTitle="Categoriile de Blog">
      <NewCategoryModal styleClass="btn btn-primary text-light my-2" />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Denumire</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {categories?.result.map((category, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{category.data().name}</td>
              <td className="d-inline-flex gap-2">
                <button className="btn btn-outline-info d-inline-flex align-items-center justify-content-center fs-5">
                  <MdEdit />
                </button>
                <button
                  onClick={async () => {
                    const result = await firebaseClient.delete(category.id);
                    if (result) {
                      await queryClient.invalidateQueries({
                        queryKey: ["categories"],
                      });
                      showToast("Categorie ștearsă cu succes!", Method.Success);
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
        </tbody>
      </table>
    </PageContent>
  );
};

export default CategoriesPage;
