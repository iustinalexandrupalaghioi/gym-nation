import FirebaseClient from "../utilities/firebase-client";

const useGetFileURL = (file: File | null, endpoint: string) => {
  const firebaseClient = new FirebaseClient(`/${endpoint}/${file?.name}`);
  return firebaseClient.getFileURL(file);
};

export default useGetFileURL;
