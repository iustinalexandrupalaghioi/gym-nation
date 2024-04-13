import {
  getDocs,
  query,
  collection,
  getDoc,
  doc,
  addDoc,
  DocumentData,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../db";

class APIClient {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return getDocs(query(collection(db, this.endpoint))).then(
      (res) => res.docs
    );
  };

  get = (id: string) => {
    return getDoc(doc(db, this.endpoint, id));
  };

  post = (data: DocumentData) => {
    return addDoc(collection(db, this.endpoint), data);
  };

  getImageURL = async (image: File | null) => {
    const storage = getStorage();
    const storageRef = ref(storage, this.endpoint);
    await uploadBytes(storageRef, image!);
    return await getDownloadURL(storageRef);
  };
}

export default APIClient;
