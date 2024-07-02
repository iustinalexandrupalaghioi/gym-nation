import { useParams } from "react-router-dom";
import LoadingStatus from "../../../components/LoadingStatus";
import { Section } from "../../../entities/Workout";
import ErrorPage from "../../Client/ErrorPage";
import useWorkout from "../../../hooks/Workout/useWorkout";
import { useEffect, useState } from "react";
import ViewExerciseModal from "../../../components/dashboard/AdminWorkout/ViewExerciseModal";
import { queryClient } from "../../../main";
import DeleteExerciseModal from "../../../components/dashboard/AdminWorkout/DeleteExerciseModal";
import PageContent from "../../../components/dashboard/PageContent";
import UpdateExerciseModal from "../../../components/workouts/NewWorkout/UpdateExercise";

const WorkoutExercisesPage = () => {
  const { titleSlug, sectionId } = useParams();
  const [title, setPageTitle] = useState("");

  const { data, isLoading, error, refetch } = useWorkout(
    "titleSlug",
    titleSlug!
  );
  const workout = data?.result[0];
  const sections: Section[] = workout?.data().sections;
  const currentSection = sections.find((s) => s.id.toString() === sectionId);

  if (error) return <ErrorPage />;
  if (isLoading) return <LoadingStatus />;
  useEffect(() => {
    setPageTitle(
      currentSection && currentSection.exercises.length > 0
        ? "Exercițiile din secțiunea " + currentSection.name
        : "Nu sunt exerciții de afișat"
    );
  }, [data]);

  return (
    <PageContent pageTitle={title}>
      {currentSection && currentSection.exercises.length > 0 && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Nume</th>
              <th>Grupa musculară</th>
              <th>Acțiuni</th>
            </tr>
          </thead>

          <tbody>
            {currentSection?.exercises.map((exercise, index) => (
              <tr key={exercise.nameSlug}>
                <td className="text-body-secondary">{index + 1}</td>
                <td>{exercise.exerciseName}</td>
                <td className="text-body-secondary">
                  {exercise.muscleGroup?.name}
                </td>
                <td className="d-flex gap-2">
                  <ViewExerciseModal
                    exercise={exercise}
                    exerciseIndex={index}
                  />
                  <UpdateExerciseModal
                    onSuccessUpdate={async () => {
                      await queryClient.refetchQueries({
                        queryKey: ["workouts"],
                      });
                      refetch();
                    }}
                    initialExercise={exercise}
                    modalId={`updateExercise-${exercise.nameSlug}`}
                    sections={sections}
                    workout={workout}
                  />
                  <DeleteExerciseModal
                    modalId={`deleteExercise-${exercise.nameSlug}`}
                    question="Ești sigur că vrei să stergi acest exercițiu?"
                    successMessage="Exercițiul a fost șters cu succes!"
                    errorMessage="Nu s-a putut efectua acțiunea de ștergere"
                    queryKey="workouts"
                    sectionIdToDelete={sectionId!}
                    exerciseNameSlugToDelete={exercise.nameSlug}
                    workout={workout}
                    onDeleteExercise={async () => {
                      await refetch();
                      await queryClient.refetchQueries({
                        queryKey: ["workouts"],
                      });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </PageContent>
  );
};

export default WorkoutExercisesPage;
