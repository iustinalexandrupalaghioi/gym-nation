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
  deleteDoc,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../firebase-config";

class FirebaseClient {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = async (field?: string, id?: string, orderByField?: string) => {
    let baseQuery =
      field && id
        ? query(collection(db, this.endpoint), where(field, "==", id))
        : orderByField
        ? query(collection(db, this.endpoint), orderBy(orderByField))
        : query(collection(db, this.endpoint));

    const querySnapshot = await getDocs(baseQuery);

    const result = querySnapshot.docs;

    const snapshot = await getCountFromServer(baseQuery);
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

  update = async (documentId: string, data: DocumentData): Promise<boolean> => {
    try {
      const docRef = doc(db, this.endpoint, documentId);
      await updateDoc(docRef, data);
      return true;
    } catch (error) {
      return false;
    }
  };

  delete = async (documentId: string): Promise<boolean> => {
    try {
      const docRef = doc(db, this.endpoint, documentId);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      return false;
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
