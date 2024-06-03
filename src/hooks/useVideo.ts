import FirebaseClient from "../utilities/firebase-client";

const useVideo = (video: File | null, endpoint: string) => {
  const firebaseClient = new FirebaseClient(`/${endpoint}/${video?.name}`);
  return firebaseClient.getFileURL(video);
};

export default useVideo;
