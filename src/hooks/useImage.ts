import FirebaseClient from "../utilities/firebase-client";

const useImage = (image: File | null) => {
  const firebaseClient = new FirebaseClient(`/blogImages/${image?.name}`);
  return firebaseClient.getFileURL(image);
};

export default useImage;
