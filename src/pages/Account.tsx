import { NavLink, Navigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { useState } from "react";
import useUserStatusStore from "../stores/userStore";
import SubscriptionButton from "../components/account/SubscriptionButton";
import LoadingButton from "../components/account/LoadingButton";
import SignOutButton from "../components/account/SignOutButton";
import logo from "/images/logo1.png";

const Account = () => {
  const [isLoading, setLoading] = useState(false);
  const isPremium = useUserStatusStore((s) => s.userStatus.isPremium);

  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center col-xl-10 col-xxl-8 px-4 py-5 vh-100 gap-3">
      <NavLink className="navbar-brand" to="/" title="Pagina principala">
        <img src={logo} className="img-fluid" style={{ height: "60px" }} />
      </NavLink>
      <p className="text-body-secondary m-0">
        Conectat ca {auth.currentUser?.displayName}
      </p>
      <p className="m-0">{auth.currentUser?.email}</p>

      <div
        className="card bg-body-tertiary flex align-items-center justify-content-center p-5"
        style={{ height: "100px" }}
      >
        {isPremium ? "Abonament Premium" : "Membru standard"}
      </div>

      {isLoading ? (
        <LoadingButton styleClass="btn btn-primary text-light p-3" />
      ) : (
        <SubscriptionButton
          styleClass="btn btn-primary text-light p-3"
          setLoading={setLoading}
        />
      )}

      <SignOutButton styleClass="btn btn-outline-danger" />
    </div>
  );
};

export default Account;
