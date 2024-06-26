import { Link, useParams } from "react-router-dom";
import PageContent from "../../components/dashboard/PageContent";
import useWorkout from "../../hooks/useWorkout";
import ErrorPage from "../Client/ErrorPage";
import LoadingStatus from "../../components/LoadingStatus";
import { Section } from "../../entities/Workout";
import { MdDeleteForever, MdEdit, MdRemoveRedEye } from "react-icons/md";
import ViewExerciseModal from "../../components/dashboard/AdminWorkout/ViewExerciseModal";

const WorkoutExercisesPage = () => {
  const { titleSlug, sectionId } = useParams();
  console.log(titleSlug, sectionId);

  const { data, isLoading, error } = useWorkout("titleSlug", titleSlug!);
  const workout = data?.result[0];
  const sections: Section[] = workout?.data().sections;
  const currentSection = sections.find((s) => s.id.toString() === sectionId);
  if (error) return <ErrorPage />;
  return (
    <PageContent pageTitle="Exercițiile antrenamentului">
      <table className="table table-striped">
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
                  <div className="btn btn-outline-info d-inline-flex align-items-center justify-content-center">
                    <MdEdit />
                  </div>
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
            ))
          )}
        </tbody>
      </table>
    </PageContent>
  );
};

export default WorkoutExercisesPage;
