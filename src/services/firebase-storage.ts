import {
  FirebaseStorage,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
const uploadImage = async (
  image: File | null,
  storage: FirebaseStorage,
  path: string
) => {
  if (image) {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, image);
    return await getDownloadURL(storageRef);
  }
};

export { uploadImage };
