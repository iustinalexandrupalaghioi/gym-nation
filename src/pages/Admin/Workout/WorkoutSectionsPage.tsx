import { MdRemoveRedEye, MdDeleteForever } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import LoadingStatus from "../../../components/LoadingStatus";
import PageContent from "../../../components/dashboard/PageContent";
import { Section } from "../../../entities/Workout";
import ErrorPage from "../../Client/ErrorPage";
import useWorkout from "../../../hooks/Workout/useWorkout";
import UpdateSectionModal from "../../../components/workouts/NewWorkout/UpdateSectionModal";

const WorkoutSectionsPage = () => {
  const { titleSlug } = useParams();

  const { data, isLoading, error } = useWorkout("titleSlug", titleSlug!);
  const workout = data?.result[0];
  const sections: Section[] = workout?.data().sections;

  if (error) return <ErrorPage />;
  if (isLoading) return <LoadingStatus />;
  return (
    <PageContent pageTitle="Descoperă Secțiunile">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Denumire</th>
            <th>Nr. exerciții</th>
            <th>Acțiuni</th>
          </tr>
        </thead>

        <tbody>
          {sections.map((section, index) => (
            <tr key={section.id}>
              <td className="text-body-secondary">{index + 1}</td>
              <td>{section.name}</td>
              <td className="text-body-secondary">
                {section.exercises.length}
              </td>
              <td className="d-flex gap-2">
                <Link
                  title="Vezi exercițiile"
                  to={`/admin/workouts/${workout!.data().titleSlug}/sections/${
                    section.id
                  }`}
                  className="btn btn-outline-info d-inline-flex align-items-center justify-content-center"
                >
                  <MdRemoveRedEye />
                </Link>
                <UpdateSectionModal
                  modalId={`sectionId-${section.id}`}
                  workoutId={workout?.id}
                  section={section}
                />
                <button
                  title="Șterge secțiunea"
                  onClick={async () => {
                    console.log("deleted");
                  }}
                  className="btn btn-outline-danger d-inline-flex align-items-center justify-content-center"
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

export default WorkoutSectionsPage;
