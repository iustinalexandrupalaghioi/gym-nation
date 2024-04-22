import { DocumentData } from "firebase/firestore";
import APIClient from "./firebase-client";
import { queryClient } from "../main";

const apiClient = new APIClient("/posts");
const postNewBlog = async (data: DocumentData) => {
  await apiClient
    .post(data)
    .then(() => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Articolul a fost postat cu succes!");
    })
    .catch((err) => {
      console.error(err.message);
      alert(
        "Articolul nu a putut fi publicat. Te rugam sa incerci mai tarziu."
      );
    });
};
export default postNewBlog;
