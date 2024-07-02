import { Link } from "react-router-dom";
import PageContent from "../../components/dashboard/PageContent";

const Home = () => {
  return (
    <PageContent pageTitle="Panoul de Administrare Gym Nation">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          <div className="col">
            <Link
              to="/admin/blog"
              className="btn btn-primary text-light d-flex flex-column align-items-center"
            >
              <span>Articole de Blog</span>
            </Link>
          </div>

          <div className="col">
            <Link
              to="/admin/blog/categories"
              className="btn btn-primary text-light  d-flex flex-column align-items-center"
            >
              <span>Categorii de Postări</span>
            </Link>
          </div>
          <div className="col">
            <Link
              to="/admin/workouts"
              className="btn btn-primary text-light  d-flex flex-column align-items-center"
            >
              <span>Antrenamente</span>
            </Link>
          </div>
          <div className="col">
            <Link
              to="/admin/workouts/muscles"
              className="btn btn-primary text-light  d-flex flex-column align-items-center"
            >
              <span>Grupe Musculare</span>
            </Link>
          </div>
        </div>
      </div>
    </PageContent>
  );
};

export default Home;
