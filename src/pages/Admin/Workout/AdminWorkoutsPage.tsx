import { MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import LoadingStatus from "../../../components/LoadingStatus";
import PageContent from "../../../components/dashboard/PageContent";
import ErrorPage from "../../Client/ErrorPage";
import useFetchWorkouts from "../../../hooks/Workout/useFetchWorkouts";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import DeleteModal from "../../../components/dashboard/AdminWorkout/DeleteWorkoutModal";

const AdminWorkoutsPage = () => {
  const { data: workouts, error, isLoading } = useFetchWorkouts();
  if (error) return <ErrorPage />;
  if (isLoading) return <LoadingStatus />;
  return (
    <PageContent pageTitle="Antrenamentele disponibile">
      <table className="table table-hover">
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
                  {workout.data().sections?.length}
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
                    to={`/admin/workouts/${workout.data().titleSlug}/edit`}
                    className="btn btn-outline-info d-inline-flex align-items-center justify-content-center"
                  >
                    <MdEdit />
                  </Link>
                  <DeleteModal
                    question="Ești sigur că vrei să ștergi antrenamentul?"
                    modalId="deleteWorkoutModal"
                    docId={workout.id}
                    collection="/workouts"
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

export default AdminWorkoutsPage;
