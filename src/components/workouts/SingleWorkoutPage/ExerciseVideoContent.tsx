interface Props {
  video: string;
}
const ExerciseVideoContent = ({ video }: Props) => {
  const isYouTubeUrl = (url: string) => {
    return url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
  };

  return (
    <div className="col-12 col-md-8">
      <div className="shadow rounded-4">
        {isYouTubeUrl(video) ? (
          <iframe
            className="w-100 rounded-4"
            height="650px"
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
            height="650px"
          />
        )}
      </div>
    </div>
  );
};

export default ExerciseVideoContent;
