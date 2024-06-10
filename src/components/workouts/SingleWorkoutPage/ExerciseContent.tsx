import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import Exercise from "../../../entities/Exercise";

interface Props {
  video: string | undefined;
  workout: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
  exercise: Exercise | undefined;
}
const ExerciseContent = ({ video, workout, exercise }: Props) => {
  const { title, desc } = workout?.data()!;
  const { name, exerciseDescription } = exercise!;

  const isYouTubeUrl = (url: string) => {
    return url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
  };

  return (
    <div className="col-12 col-md-8">
      <div className="row mb-2">
        <h3>{title}</h3>
        <p className="text-body-secondary">{desc}</p>
      </div>
      <div className="shadow rounded-4 mb-2">
        {isYouTubeUrl(video!) ? (
          <iframe
            className="w-100 rounded-4"
            height="600px"
            src={video}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
          ></iframe>
        ) : (
          <video
            controls
            src={video}
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
