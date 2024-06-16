import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState, FormEvent, ChangeEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase-config";
import getUserStatus from "../utilities/getUserStatus";
import useUserStatusStore from "../stores/userStore";
import logo from "/images/logo1.png";
import getUserRole from "../utilities/getUserRole";

interface Credentials {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const setStatus = useUserStatusStore((s) => s.setStatus);
  const setRole = useUserStatusStore((s) => s.setRole);

  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  let { email, password } = credentials;

  // update credentials state for user inputs
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setCredentials((prev) => ({ ...prev, email: value }));
    } else {
      setCredentials((prev) => ({ ...prev, password: value }));
    }
  };

  // handle sign in with email and password
  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      //check user status
      const newUserStatus = auth.currentUser ? await getUserStatus() : false;
      setStatus(newUserStatus);

      //check user role
      const newUserRole = auth.currentUser
        ? getUserRole(auth.currentUser.uid)
        : false;
      setRole(newUserRole);
      setCredentials({ email: "", password: "" });
      navigate("/");
    } catch (error: any) {
      const errorMessage = error.message;
      console.error(errorMessage);
      alert("Nu s-a putut realiza autentificarea.");
    }
  };

  // handle sign in with google
  const handleSignInWithPopup = async () => {
    try {
      await signInWithPopup(auth, provider);

      //check user status
      const newUserStatus = auth.currentUser ? await getUserStatus() : false;
      setStatus(newUserStatus);

      //check user role
      const newUserRole = auth.currentUser
        ? getUserRole(auth.currentUser.uid)
        : false;
      setRole(newUserRole);
      navigate("/");
    } catch (err: any) {
      const errorMessage = err.message;
      console.error(errorMessage);
      alert("Nu s-a putut realiza autentificarea.");
    }
  };

  return (
    <div className="vh-100">
      <header className="navbar bg-dark flex-md-nowrap shadow">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} className="img-fluid" style={{ height: "55px" }} />
          </NavLink>
        </div>
      </header>
      <div className="container d-flex flex-column justify-content-center align-items-center col-xl-10 col-xxl-8 px-4 py-5 h-75">
        <form
          className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
          onSubmit={(event: FormEvent<HTMLFormElement>) => handleSignIn(event)}
        >
          <div className="form-group mb-3">
            <label htmlFor="email">Adresă de email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="nume@exemplu.com"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Parolă</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Parolă"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button
            className="w-100 btn btn-primary text-light mb-2"
            type="submit"
          >
            Conectare
          </button>
          <button
            onClick={handleSignInWithPopup}
            type="button"
            className="w-100 d-flex align-items-center justify-content-center gap-1 btn btn-outline-info"
          >
            <FcGoogle /> Autentificare cu Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
