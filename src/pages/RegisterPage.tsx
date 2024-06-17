import { useState, FormEvent, ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-config";
import logo from "/images/logo1.png";
import ToastAlert from "../components/ToastAlert";
import showToast, { Method } from "../utilities/showToast";

interface Credentials {
  name: { fname: string; lname: string };
  email: string;
  password: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({
    name: { fname: "", lname: "" },
    email: "",
    password: "",
  });
  let { name, email, password } = credentials;

  // update credentials state for user inputs
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setCredentials((prev) => ({ ...prev, email: value }));
    } else if (name === "password") {
      setCredentials((prev) => ({ ...prev, password: value }));
    } else if (name === "fname") {
      setCredentials((prev) => ({
        ...prev,
        name: { ...prev.name, fname: value },
      }));
    } else if (name === "lname") {
      setCredentials((prev) => ({
        ...prev,
        name: { ...prev.name, lname: value },
      }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: `${name.fname} ${name.lname}`,
      });

      setCredentials({
        name: { fname: "", lname: "" },
        email: "",
        password: "",
      });
      const message = "Te-ai înregistrat cu succes";
      const method = Method.Success;
      showToast(message, method, () => navigate("/login"));
    } catch (error) {
      setCredentials({
        name: { fname: "", lname: "" },
        email: "",
        password: "",
      });
      const message = "Ceva nu a funcționat. Te rugăm să încerci mai târziu!";
      const method = Method.Error;
      showToast(message, method);
    }
  };

  return (
    <div className="vh-100">
      <header className="navbar bg-dark flex-md-nowrap shadow">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} className="img-fluid" style={{ height: "55px" }} />
          </NavLink>
        </div>
      </header>
      <div className="container d-flex flex-column justify-content-center align-items-center col-xl-10 col-xxl-8 px-4 py-5 h-75">
        <form
          className="p-4 p-md-5 border-0 shadow rounded-3 bg-body-tertiary"
          onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}
        >
          <ToastAlert />
          <div className="d-flex gap-2 flex-column flex-md-row">
            <div className="form-group mb-3">
              <label className="text-body-secondary" htmlFor="fname">
                Nume
              </label>
              <input
                type="text"
                name="fname"
                className="form-control"
                id="fname"
                placeholder="Popescu"
                value={name.fname}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label className="text-body-secondary" htmlFor="lname">
                Prenume
              </label>
              <input
                type="text"
                name="lname"
                className="form-control"
                id="lname"
                placeholder="Marian"
                value={name.lname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <label className="text-body-secondary" htmlFor="email">
              Adresă de email
            </label>
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
            <label className="text-body-secondary" htmlFor="password">
              Parolă
            </label>
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
          <p className="text-body-secondary" style={{ fontSize: "0.8rem" }}>
            Ai deja un cont?{" "}
            <span>
              <NavLink
                to="/login"
                className="d-inline-flex nav-link text-light hover hover-primary"
              >
                Autentifică-te
              </NavLink>
            </span>
          </p>
          <button
            className="w-100 btn btn-primary text-light mb-2"
            type="submit"
          >
            Înregistrează-te
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
