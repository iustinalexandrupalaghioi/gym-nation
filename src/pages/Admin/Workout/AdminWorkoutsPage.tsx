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
      <div className="d-flex gap-2 my-2">
        <Link
          to="/admin/workouts/new"
          className="btn btn-primary text-light my-2"
        >
          Adaugă antrenament
        </Link>
      </div>
      {workouts?.result && workouts.result.length > 0 ? (
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
                  <td>
                    <Link
                      title="Vezi secțiunile"
                      to={`/admin/workouts/${
                        workout.data().titleSlug
                      }/sections`}
                      className="btn btn-outline-info d-inline-flex align-items-center justify-content-center me-2"
                    >
                      <MdRemoveRedEye />
                    </Link>
                    <Link
                      to={`/admin/workouts/${workout.data().titleSlug}/edit`}
                      className="btn btn-outline-info d-inline-flex align-items-center justify-content-center me-2"
                    >
                      <MdEdit />
                    </Link>
                    <DeleteModal
                      successMessage="Antrenamentul a fost șters cu succes!"
                      errorMessage="Nu s-a putut efectua acțiunea de șterege."
                      queryKey="workouts"
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
      ) : (
        <h2>Nu sunt antrenamente de afișat</h2>
      )}
    </PageContent>
  );
};

export default AdminWorkoutsPage;
