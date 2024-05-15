import { signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../db.ts";
interface Credentials {
  email: string;
  password: string;
}
const LoginPage = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { email, password } = credentials;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in: ", user);
      setCredentials({ email: "", password: "" });
      navigate("/");
    } catch (error: any) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  }

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5 vh-100">
      <div className="row align-items-center g-lg-5 py-5 h-100">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
            Vertically centered hero sign-up form
          </h1>
          <p className="col-lg-10 fs-4">
            Below is an example form built entirely with Bootstrap’s form
            controls. Each required form group has a validation state that can
            be triggered by attempting to submit the form without completing it.
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form
            className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
            onSubmit={(event: FormEvent<HTMLFormElement>) =>
              handleSignIn(event)
            }
          >
            <div className="form-group mb-3">
              <label htmlFor="email">Adresă de email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="nume@exemplu.com"
                value={credentials.email}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setCredentials((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Parolă</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Parolă"
                value={credentials.password}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }))
                }
              />
            </div>
            <button className="w-100 btn btn-primary text-light" type="submit">
              Conectare
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
