import { db } from "../../db";
import { collection, query, getDocs } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const BlogPostsOverview = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return getDocs(query(collection(db, "posts")));
    },
  });
  if (error) return;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="col-12 col-md-8">
      {data?.docs.map((doc) => (
        <div key={doc.id} className="card border-0 shadow-lg mb-5">
          <div className="row g-0 justify-content-between">
            <div className="col-12 col-lg-8">
              <div className="card-body">
                <h5 className="card-title">{doc.data().blogTitle}</h5>
                <p className="card-text">
                  <small className="text-body-secondary">
                    Postat la data de: {doc.data().createdAt}
                  </small>
                </p>
                <p className="card-text">
                  {doc.data().textContent.substring(0, 200)}...
                </p>

                <Link to={`/blog/${doc.id}`}>Citește articolul {">>"}</Link>
              </div>
            </div>

            <div className="col-lg-4">
              <img
                src={doc.data().imageSource}
                className="h-100 w-100 rounded-end"
                alt={doc.data().blogTitle}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="buttons d-flex gap-2 justify-content-between">
        <button className="btn btn-outline-primary btnOutline">Înapoi</button>
        <button className="btn btn-primary text-light">Pagina următoare</button>
      </div>
    </div>
  );
};

export default BlogPostsOverview;
