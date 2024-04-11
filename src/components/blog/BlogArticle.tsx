import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../db";
import { useQuery } from "@tanstack/react-query";

const BlogArticle = () => {
  const { id } = useParams();
  const docRef = doc(db, "posts", id!);
  const {
    data: post,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["article"],
    queryFn: () => {
      return getDoc(docRef);
    },
  });
  if (error) return;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="col-12 col-md-8">
      <div className="mb-3 d-flex flex-column gap-2">
        <img
          src={post?.data()?.imageSource}
          className="card-img-top rounded-2 shadow-lg"
          alt={post?.data()?.blogTitle}
        />
        <div className="card-body">
          <h3 className="card-title">{post?.data()?.blogTitle}</h3>
          <p className="card-text">
            <small className="text-body-secondary">
              Postat la data de: {post?.data()?.createdAt}
            </small>
          </p>
          <div
            className="card-text"
            dangerouslySetInnerHTML={{ __html: post?.data()?.blogContent }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
