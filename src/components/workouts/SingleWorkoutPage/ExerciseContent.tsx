import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import Exercise from "../../../entities/Exercise";

interface Props {
  workout: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
  activeExercise: Exercise | undefined;
}
const ExerciseContent = ({ workout, activeExercise }: Props) => {
  const { title, desc } = workout?.data()!;
  const { name, exerciseDescription, videoURL, videoLink } = activeExercise!;
  console.log(videoURL);

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
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
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
