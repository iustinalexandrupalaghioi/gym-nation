import FirebaseClient from "../utilities/firebase-client";

const useImage = (image: File | null, endpoint: string) => {
  const firebaseClient = new FirebaseClient(`/${endpoint}/${image?.name}`);
  return firebaseClient.getFileURL(image);
};

export default useImage;
