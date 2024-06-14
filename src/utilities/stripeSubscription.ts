import { getFunctions, httpsCallable } from "firebase/functions";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import app, { db, auth } from "../firebase-config";

export const getCheckoutUrl = async (priceId: string): Promise<string> => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User is not authenticated");
  const checkoutSessionRef = collection(
    db,
    "customers",
    userId,
    "checkout_sessions"
  );

  const docRef = await addDoc(checkoutSessionRef, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  });

  return new Promise<string>((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const { error, url } = snap.data() as {
        error?: { message: string };
        url?: string;
      };
      if (error) {
        unsubscribe();
        reject(new Error(`An error occured: ${error.message}`));
      }
      if (url) {
        console.log("Stripe Checkout URL: ", url);
        unsubscribe();
        resolve(url);
      }
    });
  });
};

export const getPortalUrl = async (): Promise<string> => {
  const user = auth.currentUser;
  let dataWithUrl: any;
  try {
    const functions = getFunctions(app, "europe-central2");
    const functionsRef = httpsCallable(
      functions,
      "ext-firestore-stripe-payments-createPortalLink"
    );
    const { data } = await functionsRef({
      customerId: user?.uid,
      returnUrl: window.location.origin,
    });
    dataWithUrl = data as { url: string };
    console.log("Reroute to Stripe Portal: ", dataWithUrl.url);
  } catch (error) {
    console.error(error);
  }

  return new Promise<string>((resolve, reject) => {
    if (dataWithUrl.url) {
      resolve(dataWithUrl.url);
    } else {
      reject(new Error("No url returned"));
    }
  });
};
