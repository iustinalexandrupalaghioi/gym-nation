import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import FirebaseClient from "../utilities/firebase-client";

const firebaseClient = new FirebaseClient("/customers");
const fetchCustomersWithSubscriptions = async () => {
  const customersSnapshot = await firebaseClient.get();

  const customersList = await Promise.all(
    customersSnapshot.result.map(async (doc) => {
      const subscriptionsSnapshot = await getDocs(
        query(
          collection(db, `customers/${doc.id}/subscriptions`),
          where("status", "in", ["trialing", "active"])
        )
      );
      const subscriptions = subscriptionsSnapshot.docs.map((doc) => {
        return {
          subscriptionId: doc.id,
          subscriptionStatus: doc.data().status,
        };
      });
      return {
        docId: doc.id,
        id: doc.data().stripeId,
        data: doc.data(),
        subscriptions,
      };
    })
  );
  return customersList;
};

const useCustomersSubcription = () => {
  return useQuery({
    queryKey: ["customers-subscriptions"],
    queryFn: fetchCustomersWithSubscriptions,
  });
};

export default useCustomersSubcription;
