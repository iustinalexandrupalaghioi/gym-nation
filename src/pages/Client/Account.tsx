import { NavLink, Navigate } from "react-router-dom";
import { useState } from "react";

import logo from "/images/logo1.png";
import useUserStatusStore from "../../stores/userStore";
import { auth } from "../../firebase-config";
import LoadingButton from "../../components/account/LoadingButton";
import SubscriptionButton from "../../components/account/SubscriptionButton";
import SignOutButton from "../../components/account/SignOutButton";
import ToastAlert from "../../components/ToastAlert";

const Account = () => {
  const [isLoading, setLoading] = useState(false);

  const isPremium = useUserStatusStore((s) => s.userStatus.isPremium);
  const isAdmin = useUserStatusStore((s) => s.userStatus.isAdmin);

  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="vh-100">
      <ToastAlert />
      <header className="navbar bg-dark flex-md-nowrap shadow">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} className="img-fluid" style={{ height: "55px" }} />
          </NavLink>
        </div>
      </header>
      <div className="container  d-flex flex-column justify-content-center align-items-center text-center col-xl-10 col-xxl-8 px-4 py-5 gap-3 h-75">
        <div className="p-4 p-md-5 border-0 shadow rounded-3 bg-body-tertiary d-flex flex-column justify-content-center gap-3">
          <p className="text-body-secondary m-0">
            Conectat ca{" "}
            <span className="text-primary">
              {auth.currentUser?.displayName}
            </span>
          </p>
          <p className="m-0">{auth.currentUser?.email}</p>

          <div
            className="card border-0 flex align-items-center justify-content-center p-5"
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
      </div>
    </div>
  );
};

export default Account;
