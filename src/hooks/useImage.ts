import APIClient from "../utilities/firebase-client";

const useImage = (image: File | null) => {
  const apiClient = new APIClient(`/blogImages/${image?.name}`);
  return apiClient.getFileURL(image);
};

export default useImage;
