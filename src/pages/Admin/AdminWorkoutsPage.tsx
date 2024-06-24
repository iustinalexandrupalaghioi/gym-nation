import { MdDeleteForever, MdRemoveRedEye } from "react-icons/md";
import PageContent from "../../components/dashboard/PageContent";
import useFetchWorkouts from "../../hooks/useFetchWorkouts";
import showToast, { Method } from "../../utilities/showToast";
import { queryClient } from "../../main";
import { Link } from "react-router-dom";
import FirebaseClient from "../../utilities/firebase-client";
import ErrorPage from "../Client/ErrorPage";
import LoadingStatus from "../../components/LoadingStatus";
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
          {workouts?.result.map((workout, index) => (
            <tr key={workout.id}>
              <td className="text-body-secondary">{index + 1}</td>
              <td>{workout.data().title}</td>
              <td className="text-body-secondary">
                {workout.data().sections.length}
              </td>
              <td className="d-inline-flex gap-2">
                <Link
                  title="Vezi articolul"
                  to={`/workouts/${workout.data().titleSlug}`}
                  className="btn btn-outline-info d-inline-flex align-items-center justify-content-center fs-5"
                >
                  <MdRemoveRedEye />
                </Link>
                <button
                  title="Șterge articolul"
                  onClick={async () => {
                    const result = await firebaseClient.delete(workout.id);
                    if (result) {
                      await queryClient.invalidateQueries({
                        queryKey: ["posts"],
                      });
                      showToast("Antrenament șters cu succes!", Method.Success);
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

export default AdminWorkoutsPage;
