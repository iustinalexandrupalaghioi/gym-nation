import {
  getDocs,
  query,
  collection,
  addDoc,
  DocumentData,
  where,
  getCountFromServer,
  setDoc,
  doc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../firebase-config";

class FirebaseClient {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = async (field?: string, id?: string) => {
    const queryString =
      field && id
        ? query(collection(db, this.endpoint), where(field, "==", id))
        : query(collection(db, this.endpoint));

    const res = await getDocs(queryString);
    const result = res.docs;

    const snapshot = await getCountFromServer(queryString);
    const count = snapshot.data().count;

    return { result, count };
  };

  post = async (data: DocumentData, customId?: string) => {
    if (customId) {
      await setDoc(doc(db, this.endpoint, customId), data);
    } else {
      await addDoc(collection(db, this.endpoint), data);
    }
  };

  getFileURL = async (file: File | null) => {
    const storage = getStorage();
    const storageRef = ref(storage, this.endpoint);
    await uploadBytes(storageRef, file!);
    return await getDownloadURL(storageRef);
  };
}

export default FirebaseClient;
