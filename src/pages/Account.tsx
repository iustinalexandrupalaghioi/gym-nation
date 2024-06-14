import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import { getCheckoutUrl, getPortalUrl } from "../utilities/stripeSubscription";
import { useEffect, useState } from "react";
import useUserStatusStore from "../stores/userStore";
import logo from "/images/logo1.png";
import getPremiumStatus from "../utilities/getPremiumStatus";

const Account = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const {
    userStatus: { isPremium },
    setStatus,
  } = useUserStatusStore();

  // check premium status function
  const checkPremiumStatus = async () => {
    const newPremiumStatus = auth.currentUser
      ? await getPremiumStatus()
      : false;
    setStatus(newPremiumStatus);
  };

  // check if current user is a premium or standard member
  useEffect(() => {
    checkPremiumStatus();
  }, [auth.currentUser?.uid]);

  // log out function
  const handleSignOut = async () => {
    if (auth.currentUser) {
      await signOut(auth);
      navigate("/");
    }
  };

  // handle upgrade to premium function
  const upgradeToPremium = async () => {
    try {
      const priceId = "price_1PRWZeP64kuct9Hh0pd8XtP8";
      const checkoutUrl = await getCheckoutUrl(priceId);
      window.location.assign(checkoutUrl);
      setLoading(false);
    } catch (error: any) {
      console.error("Error upgrading to premium: ", error);
      alert(error.message);
    }
  };

  // handle manage subscription function
  const manageSubscription = async () => {
    try {
      const portalUrl = await getPortalUrl();
      window.location.assign(portalUrl);
      setLoading(false);
    } catch (error: any) {
      console.error("Error upgrading to premium: ", error);
      alert(error.message);
    }
  };

  const premiumBtnText = isPremium ? "Modifică abonamentul" : "Abonează-te";
  const premiumBtnFunction = isPremium ? manageSubscription : upgradeToPremium;
  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center col-xl-10 col-xxl-8 px-4 py-5 vh-100 gap-3">
      <NavLink className="navbar-brand" to="/">
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
        <button
          className="btn btn-primary text-light p-3"
          disabled={true}
          type="button"
        >
          <span
            className="spinner-border spinner-border-sm"
            aria-hidden="true"
          ></span>
          <span role="status">Se încarcă...</span>
        </button>
      ) : (
        <button
          className="btn btn-primary text-light p-3"
          type="button"
          onClick={async () => {
            setLoading(true);
            await premiumBtnFunction();
          }}
        >
          {premiumBtnText}
        </button>
      )}

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
