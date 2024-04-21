import useFetchPost from "../../../hooks/useFetchPost";
import useFetchPosts from "../../../hooks/useFetchPosts";
interface Props {
  slug: string;
}
const PostsNumber = ({ slug }: Props) => {
  const { data: posts } = useFetchPost("postsNumber", "category.slug", slug!);
  const { data: allPosts } = useFetchPosts();
  if (slug) return <p className="text-primary fw-bold">{posts?.count}</p>;
  return <p className="text-primary fw-bold">{allPosts?.count}</p>;
};

export default PostsNumber;
