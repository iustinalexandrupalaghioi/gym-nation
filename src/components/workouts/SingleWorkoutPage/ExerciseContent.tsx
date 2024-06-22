import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import useExerciseQueryStore from "../../../stores/exerciseQueryStore";

interface Props {
  workout: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
}

const ExerciseContent = ({ workout }: Props) => {
  const { exercise: activeExercise } = useExerciseQueryStore(
    (s) => s.exerciseQuery
  );
  const { exerciseName, videoLink, exerciseDescription, muscleGroup } =
    activeExercise;
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
          <span className="text-primary">{exerciseName}</span>:
        </h5>
        <p className="text-body-secondary">{exerciseDescription}</p>
        <p className="text-body-secondary">
          Grupa de mușchi vizată:{" "}
          <span className="text-primary">{muscleGroup?.name}</span>
        </p>
      </div>
    </main>
  );
};

export default ExerciseContent;
