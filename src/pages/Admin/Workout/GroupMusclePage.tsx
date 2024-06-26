import { MdDeleteForever } from "react-icons/md";
import LoadingStatus from "../../../components/LoadingStatus";
import PageContent from "../../../components/dashboard/PageContent";
import NewGroupModal from "../../../components/workouts/NewWorkout/NewGroupModal";
import { queryClient } from "../../../main";
import FirebaseClient from "../../../utilities/firebase-client";
import showToast, { Method } from "../../../utilities/showToast";
import ErrorPage from "../../Client/ErrorPage";
import useMuscles from "../../../hooks/Workout/useMuscles";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

const firebaseClient = new FirebaseClient("/muscles");
const GroupMusclePage = () => {
  const { data: muscles, error, isLoading } = useMuscles();

  if (error) return <ErrorPage />;
  return (
    <PageContent pageTitle="Grupele musculare salvate">
      <NewGroupModal styleClass="btn btn-primary text-light my-2  d-flex gap-1 align-items-center" />
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Denumire</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <LoadingStatus />
            </tr>
          ) : (
            muscles?.result.map(
              (
                group: QueryDocumentSnapshot<DocumentData, DocumentData>,
                index: number
              ) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{group.data().name}</td>
                  <td className="d-inline-flex gap-2">
                    <button
                      onClick={async () => {
                        const result = await firebaseClient.delete(group.id);
                        if (result) {
                          await queryClient.invalidateQueries({
                            queryKey: ["muscles"],
                          });
                          showToast(
                            "Grupă musculară ștearsă cu succes!",
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
            )
          )}
        </tbody>
      </table>
    </PageContent>
  );
};

export default GroupMusclePage;
