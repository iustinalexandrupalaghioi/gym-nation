import APIClient from "../services/api-client";

const useImage = (image: File | null) => {
  const apiClient = new APIClient(`/blogImages/${image?.name}`);
  return apiClient.getImageURL(image);
};

export default useImage;
