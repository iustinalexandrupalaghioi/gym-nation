import {
  getDocs,
  query,
  collection,
  addDoc,
  DocumentData,
  where,
  getCountFromServer,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../db";

class FirebaseClient {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async () => {
    const queryString = query(collection(db, this.endpoint));

    const res = await getDocs(queryString);
    const result = res.docs;

    const snapshot = await getCountFromServer(queryString);
    const count = snapshot.data().count;

    return { result, count };
  };

  get = async (field: string, id: string) => {
    const queryString = query(
      collection(db, this.endpoint),
      where(field, "==", id)
    );

    const res = await getDocs(queryString);
    const result = res.docs;

    const snapshot = await getCountFromServer(queryString);
    const count = snapshot.data().count;

    return { result, count };
  };

  post = (data: DocumentData) => {
    return addDoc(collection(db, this.endpoint), data);
  };

  update = (data: DocumentData, id: string, field: string) => {
    return updateDoc(doc(db, this.endpoint, id), { field: data });
  };

  getFileURL = async (file: File | null) => {
    const storage = getStorage();
    const storageRef = ref(storage, this.endpoint);
    await uploadBytes(storageRef, file!);
    return await getDownloadURL(storageRef);
  };
}

export default FirebaseClient;
