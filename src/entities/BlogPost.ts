export default interface BlogPost {
  title: string;
  titleSlug?: string;
  category: string;
  image: File | null;
  imageURL?: string;
  htmlContent?: string;
  textContent?: string;
  createdAt?: string;
}
