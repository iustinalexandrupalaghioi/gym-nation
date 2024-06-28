import PageContent from "../../../components/dashboard/PageContent";
import NewGroupModal from "../../../components/workouts/NewWorkout/NewGroupModal";
import ErrorPage from "../../Client/ErrorPage";
import useMuscles from "../../../hooks/Workout/useMuscles";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import LoadingStatus from "../../../components/LoadingStatus";
import UpdateGroupModal from "../../../components/workouts/NewWorkout/UpdateGroupModal";
import DeleteModal from "../../../components/dashboard/AdminWorkout/DeleteWorkoutModal";

const GroupMusclePage = () => {
  const { data: muscles, error, isLoading } = useMuscles();

  if (error) return <ErrorPage />;
  return (
    <PageContent pageTitle="Grupele musculare salvate">
      <NewGroupModal styleClass="btn btn-primary text-light my-2  d-flex gap-1 align-items-center" />
      {isLoading ? (
        <LoadingStatus />
      ) : muscles && muscles.result.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Denumire</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {muscles?.result.map(
              (
                group: QueryDocumentSnapshot<DocumentData, DocumentData>,
                index: number
              ) => (
                <tr key={group.id}>
                  <td>{index + 1}</td>
                  <td>{group.data().name}</td>
                  <td className="d-inline-flex gap-2">
                    <UpdateGroupModal
                      modalId={`updateGroup-${group.data().slug}`}
                      groupSlug={group.data().slug}
                    />
                    <DeleteModal
                      successMessage="Grupa musculară a fost ștearsă cu succes!"
                      errorMessage="Nu s-a putut efectua acțiunea de ștergere."
                      queryKey="muscles"
                      modalId={group.data().slug}
                      docId={group.id}
                      collection="/muscles"
                      question="Ștergi această grupă msuculară?"
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <h2>Nu sunt grupe musculare de afișat</h2>
      )}
    </PageContent>
  );
};

export default GroupMusclePage;
