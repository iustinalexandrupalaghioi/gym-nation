interface Props {
  source: string;
}
const ExerciseVideoContent = ({ source }: Props) => {
  const isYouTubeUrl = (url: string) => {
    return url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
  };

  return (
    <div className="col-12 col-md-8">
      <div className="rounded-4 p-2">
        {isYouTubeUrl(source) ? (
          <iframe
            className="w-100 border-0 rounded-4"
            height="650px"
            src={source}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
          ></iframe>
        ) : (
          <video controls className="w-100 border-0 rounded-4" height="650px">
            <source src={source} type="video/mp4" />
            <p>Your browser cannot play the provided video file.</p>
          </video>
        )}
      </div>
    </div>
  );
};

export default ExerciseVideoContent;
