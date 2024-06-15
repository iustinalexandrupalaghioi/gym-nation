import { NavLink, Navigate } from "react-router-dom";
import { useState } from "react";

import logo from "/images/logo1.png";
import useUserStatusStore from "../../stores/userStore";
import { auth } from "../../firebase-config";
import LoadingButton from "../../components/account/LoadingButton";
import SubscriptionButton from "../../components/account/SubscriptionButton";
import SignOutButton from "../../components/account/SignOutButton";

const Account = () => {
  const [isLoading, setLoading] = useState(false);

  const isPremium = useUserStatusStore((s) => s.userStatus.isPremium);
  const isAdmin = useUserStatusStore((s) => s.userStatus.isAdmin);

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
        {isAdmin
          ? "Admin"
          : isPremium
          ? "Abonament Premium"
          : "Membru standard"}
      </div>
      {!isAdmin ? (
        isLoading ? (
          <LoadingButton
            textContent="Redirecționare..."
            styleClass="btn btn-primary text-light p-3"
          />
        ) : (
          <SubscriptionButton
            styleClass="btn btn-primary text-light p-3"
            setLoading={setLoading}
          />
        )
      ) : null}

      <SignOutButton styleClass="btn btn-outline-danger" />
    </div>
  );
};

export default Account;
