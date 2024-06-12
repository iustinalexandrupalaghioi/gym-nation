import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import useExerciseQueryStore from "../../../utilities/exerciseQueryStore";

interface Props {
  workout: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
}

const ExerciseContent = ({ workout }: Props) => {
  const { exercise: activeExercise } = useExerciseQueryStore(
    (s) => s.exerciseQuery
  );
  const { name, videoURL, videoLink, exerciseDescription } = activeExercise;
  const { title, desc } = workout?.data()!;

  return (
    <div className="col-12 col-md-8 mt-3 mt-md-0">
      <div className="row mb-2">
        <h3>{title}</h3>
        <p className="text-body-secondary">{desc}</p>
      </div>
      <div className="shadow rounded-4 mb-2">
        {videoURL ? (
          <iframe
            className="w-100 rounded-4"
            height="600px"
            src={videoURL}
            title="YouTube video player"
            allowFullScreen
          ></iframe>
        ) : (
          <video
            controls
            src={videoLink}
            className="rounded-4 w-100"
            height="600px"
          />
        )}
      </div>
      <div className="row">
        <h5>Instrucțiuni pentru exercițiul {name}:</h5>
        <p className="text-vody-secondary">{exerciseDescription}</p>
      </div>
    </div>
  );
};

export default ExerciseContent;
