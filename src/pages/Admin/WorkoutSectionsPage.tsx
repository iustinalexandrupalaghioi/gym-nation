import { Link, useParams } from "react-router-dom";
import PageContent from "../../components/dashboard/PageContent";
import useWorkout from "../../hooks/useWorkout";
import ErrorPage from "../Client/ErrorPage";
import { Section } from "../../entities/Workout";
import { MdDeleteForever, MdRemoveRedEye } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import LoadingStatus from "../../components/LoadingStatus";

const WorkoutSectionsPage = () => {
  const { titleSlug } = useParams();

  const { data, isLoading, error } = useWorkout("titleSlug", titleSlug!);
  const workout = data?.result[0];
  const sections: Section[] = workout?.data().sections;

  if (error) return <ErrorPage />;
  return (
    <PageContent pageTitle="Descoperă Secțiunile">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Denumire</th>
            <th>Nr. exerciții</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <LoadingStatus />
          ) : (
            sections.map((section, index) => (
              <tr key={section.id}>
                <td className="text-body-secondary">{index + 1}</td>
                <td>{section.name}</td>
                <td className="text-body-secondary">
                  {section.exercises.length}
                </td>
                <td className="d-flex gap-2">
                  <Link
                    title="Vezi exercițiile"
                    to={`/admin/workouts/${
                      workout!.data().titleSlug
                    }/sections/${section.id}`}
                    className="btn btn-outline-info d-inline-flex align-items-center justify-content-center"
                  >
                    <MdRemoveRedEye />
                  </Link>
                  <button className="btn btn-outline-info d-inline-flex align-items-center justify-content-center">
                    <MdEdit />
                  </button>
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

export default WorkoutSectionsPage;
