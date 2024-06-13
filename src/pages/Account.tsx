import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { FaHome } from "react-icons/fa";
import { signOut } from "firebase/auth";

const Account = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    if (auth.currentUser) {
      await signOut(auth);
      navigate("/");
    }
  };
  if (!auth.currentUser) {
    navigate("/login");
  }
  return (
    <div className="min-vh-100 container d-flex flex-column justify-content-center alig-items-center text-center gap-3">
      <NavLink
        to="/"
        className="text-body-secondary text-decoration-none d-inline-flex align-items-center hover-light fs-2 align-self-start"
      >
        <FaHome title="Pagina principala" />
      </NavLink>
      <p className="text-body-secondary m-0">
        Conectat ca {auth.currentUser?.displayName}
      </p>
      <p className="m-0">{auth.currentUser?.email}</p>

      <div
        className="card bg-body-tertiary d-flex align-items-center justify-content-center"
        style={{ height: "100px" }}
      >
        Tip de abonament
      </div>

      <button className="btn btn-primary text-light p-3">
        Upgrade To Premium
      </button>
      <button
        className="btn 
        btn-outline-danger"
        onClick={handleSignOut}
      >
        Deconectare
      </button>
    </div>
  );
};

export default Account;
