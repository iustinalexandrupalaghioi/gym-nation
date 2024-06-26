import { MdDeleteForever, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import LoadingStatus from "../../../components/LoadingStatus";
import PageContent from "../../../components/dashboard/PageContent";
import { queryClient } from "../../../main";
import FirebaseClient from "../../../utilities/firebase-client";
import showToast, { Method } from "../../../utilities/showToast";
import ErrorPage from "../../Client/ErrorPage";
import useFetchWorkouts from "../../../hooks/Workout/useFetchWorkouts";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

const firebaseClient = new FirebaseClient("/workouts");
const AdminWorkoutsPage = () => {
  const { data: workouts, error, isLoading } = useFetchWorkouts();
  if (error) return <ErrorPage />;
  if (isLoading) return <LoadingStatus />;
  return (
    <PageContent pageTitle="Antrenamentele disponibile">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nume</th>
            <th>Secțiuni</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {workouts?.result.map(
            (
              workout: QueryDocumentSnapshot<DocumentData, DocumentData>,
              index: number
            ) => (
              <tr key={workout.id}>
                <td className="text-body-secondary">{index + 1}</td>
                <td>{workout.data().title}</td>
                <td className="text-body-secondary">
                  {workout.data().sections.length}
                </td>
                <td className="d-flex gap-2">
                  <Link
                    title="Vezi secțiunile"
                    to={`/admin/workouts/${workout.data().titleSlug}/sections`}
                    className="btn btn-outline-info d-inline-flex align-items-center justify-content-center"
                  >
                    <MdRemoveRedEye />
                  </Link>
                  <Link
                    to={`/admin/workouts/:titleSlug/edit`}
                    className="btn btn-outline-info d-inline-flex align-items justify-content-center"
                  >
                    <MdEdit />
                  </Link>
                  <button
                    title="Șterge antrenamentul"
                    onClick={async () => {
                      const result = await firebaseClient.delete(workout.id);
                      if (result) {
                        await queryClient.invalidateQueries({
                          queryKey: ["posts"],
                        });
                        showToast(
                          "Antrenament șters cu succes!",
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

export default AdminWorkoutsPage;
