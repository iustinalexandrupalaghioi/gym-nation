import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

const getUserStatus = async (userId?: string | undefined) => {
  if (!userId) throw new Error("User not logged in");

  const subscriptionRef = collection(db, "customers", userId, "subscriptions");
  const q = query(
    subscriptionRef,
    where("status", "in", ["trialing", "active"])
  );
  return new Promise<boolean>((resolve, reject) => {
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.docs.length === 0) {
          resolve(false);
        } else {
          resolve(true);
        }
        unsubscribe();
      },
      reject
    );
  });
};

export default getUserStatus;
