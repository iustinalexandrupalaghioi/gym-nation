import { MdRemoveRedEye } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import LoadingStatus from "../../../components/LoadingStatus";
import PageContent from "../../../components/dashboard/PageContent";
import { Section } from "../../../entities/Workout";
import ErrorPage from "../../Client/ErrorPage";
import useWorkout from "../../../hooks/Workout/useWorkout";
import UpdateSectionModal from "../../../components/workouts/NewWorkout/UpdateSectionModal";
import { useQueryClient } from "@tanstack/react-query";
import DeleteSectionModal from "../../../components/dashboard/AdminWorkout/DeleteSectionModal";

const WorkoutSectionsPage = () => {
  const { titleSlug } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useWorkout(
    "titleSlug",
    titleSlug!
  );
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
                  onUpdateSection={async () => {
                    refetch();
                    await queryClient.refetchQueries({
                      queryKey: ["workouts"],
                    });
                  }}
                  modalId={`sectionId-${section.id}`}
                  workoutId={workout?.id}
                  section={section}
                />
                <DeleteSectionModal
                  modalId={`deleteSection-${section.id}`}
                  successMessage="Secțiunea a fost ștearsă cu succes!"
                  errorMessage="Acțiunea de ștergere nu a putut fi realizată"
                  question="Ești sigur că vrei să ștergi această secțiune?"
                  sectionIdToDelete={section.id}
                  workout={workout}
                  onDeleteSection={() =>
                    queryClient.refetchQueries({
                      queryKey: ["titleSlug", titleSlug],
                    })
                  }
                  queryKey="workouts"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </PageContent>
  );
};

export default WorkoutSectionsPage;
