import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";

const getPremiumStatus = async () => {
  const userId = auth.currentUser?.uid;
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
        console.log("Subscription snapshot", snapshot.docs.length);
        if (snapshot.docs.length === 0) {
          console.log("No active or trialing subscriptions found");
          resolve(false);
        } else {
          console.log("Active or trilaing subscription found");
          resolve(true);
        }
        unsubscribe();
      },
      reject
    );
  });
};

export default getPremiumStatus;
