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

  getAll = async () => {
    const q = query(collection(db, this.endpoint));
    const res = await getDocs(q);
    const result = res.docs;

    const snapshot = await getCountFromServer(q);
    const count = snapshot.data().count;
    return { result, count };
  };

  get = async (field: string, id: string) => {
    const q = query(collection(db, this.endpoint), where(field, "==", id));
    const res = await getDocs(q);
    const result = res.docs;
    const snapshot = await getCountFromServer(q);
    const count = snapshot.data().count;
    return { result, count };
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
