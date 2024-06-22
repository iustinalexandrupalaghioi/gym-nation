import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import useExerciseQueryStore from "../../../stores/exerciseQueryStore";

interface Props {
  workout: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
}

const ExerciseContent = ({ workout }: Props) => {
  const { exercise: activeExercise } = useExerciseQueryStore(
    (s) => s.exerciseQuery
  );
  const { name, videoLink, exerciseDescription } = activeExercise;
  const { title, workoutDescription } = workout?.data()!;

  return (
    <main className="col-md-7 col-lg-8 col-xl-9 ms-sm-auto p-4">
      <video
        controls
        src={videoLink!}
        className="rounded-4 w-100"
        autoPlay={true}
        muted={true}
      />
      <div className="row py-2">
        <h3>{title}</h3>
        <p className="text-body-secondary">{workoutDescription}</p>
      </div>
      <div className="row py-2">
        <h5>
          Instrucțiuni pentru exercițiul{" "}
          <span className="text-primary">{name}</span>:
        </h5>
        <p className="text-body-secondary">{exerciseDescription}</p>
      </div>
    </main>
  );
};

export default ExerciseContent;
