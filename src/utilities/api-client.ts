import {
  getDocs,
  query,
  collection,
  getDoc,
  doc,
  addDoc,
  DocumentData,
  where,
  getCountFromServer,
  or,
  QueryDocumentSnapshot,
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

  get = async (
    field: string,
    id: string | QueryDocumentSnapshot<DocumentData, DocumentData>
  ) => {
    const response = await getDocs(
      query(collection(db, this.endpoint), where(field, "==", id))
    );
    const snapshot = await getCountFromServer(collection(db, this.endpoint));
    return { response, snapshot };
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
