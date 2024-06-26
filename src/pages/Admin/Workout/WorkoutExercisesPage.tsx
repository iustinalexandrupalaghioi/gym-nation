import { MdEdit, MdDeleteForever } from "react-icons/md";
import { useParams } from "react-router-dom";
import LoadingStatus from "../../../components/LoadingStatus";
import ViewExerciseModal from "../../../components/dashboard/AdminWorkout/ViewExerciseModal";
import PageContent from "../../../components/dashboard/PageContent";
import { Section } from "../../../entities/Workout";
import ErrorPage from "../../Client/ErrorPage";
import useWorkout from "../../../hooks/Workout/useWorkout";

const WorkoutExercisesPage = () => {
  const { titleSlug, sectionId } = useParams();

  const { data, isLoading, error } = useWorkout("titleSlug", titleSlug!);
  const workout = data?.result[0];
  const sections: Section[] = workout?.data().sections;
  const currentSection = sections.find((s) => s.id.toString() === sectionId);

  if (error) return <ErrorPage />;
  return (
    <PageContent pageTitle="Exercițiile antrenamentului">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Nume</th>
            <th>Grupa musculară</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <LoadingStatus />
          ) : (
            currentSection?.exercises.map((exercise, index) => (
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
                  <button
                    title="Modifică exercițiul"
                    className="btn btn-outline-info d-inline-flex align-items-center justify-content-center"
                  >
                    <MdEdit />
                  </button>
                  <button
                    title="Șterge exercițiul"
                    onClick={async () => {
                      console.log("deleted");
                    }}
                    className="btn btn-outline-danger d-inline-flex align-items-center justify-content-center"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </PageContent>
  );
};

export default WorkoutExercisesPage;
