import { signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config.ts";
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
    <div className="container d-flex justify-content-center align-items-center col-xl-10 col-xxl-8 px-4 py-5 vh-100">
      <form
        className="p-4 p-md-5 border rounded-3 bg-body-tertiary w-50"
        onSubmit={(event: FormEvent<HTMLFormElement>) => handleSignIn(event)}
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
  );
};

export default LoginPage;
