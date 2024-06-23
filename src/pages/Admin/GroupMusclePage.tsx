import useMuscles from "../../hooks/useMuscles";
import ErrorPage from "../Client/ErrorPage";
import LoadingStatus from "../../components/LoadingStatus";
import PageContent from "../../components/dashboard/PageContent";
import NewGroupModal from "../../components/workouts/NewWorkout/NewGroupModal";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { queryClient } from "../../main";
import showToast, { Method } from "../../utilities/showToast";
import FirebaseClient from "../../utilities/firebase-client";

const firebaseClient = new FirebaseClient("/muscles");
const GroupMusclePage = () => {
  const { data: muscles, error, isLoading } = useMuscles();

  if (error) return <ErrorPage />;
  if (isLoading) return <LoadingStatus />;
  return (
    <PageContent pageTitle="Categoriile de Blog">
      <NewGroupModal styleClass="btn btn-primary text-light my-2" />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Denumire</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {muscles?.result.map((group, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{group.data().name}</td>
              <td className="d-inline-flex gap-2">
                <button className="btn btn-outline-info d-inline-flex align-items-center justify-content-center fs-5">
                  <MdEdit />
                </button>
                <button
                  onClick={async () => {
                    const result = await firebaseClient.delete(group.id);
                    if (result) {
                      await queryClient.invalidateQueries({
                        queryKey: ["muscles"],
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

export default GroupMusclePage;
