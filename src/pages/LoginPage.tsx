import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState, FormEvent, ChangeEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase-config";

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

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
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
      alert("username sau parola gresite");
    }
  };

  const handleSignInWithPopup = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, provider);
      const user = userCredentials.user;
      console.log("User signed in: ", user);
      navigate("/");
    } catch (err: any) {
      const errorMessage = err.message;
      console.log(errorMessage);
      alert("Nu s-a putut realiza autentificarea.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center col-xl-10 col-xxl-8 px-4 py-5 vh-100">
      <form
        className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
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
        <button className="w-100 btn btn-primary text-light mb-2" type="submit">
          Conectare
        </button>
        <button
          onClick={handleSignInWithPopup}
          type="button"
          className="w-100 d-flex align-items-center justify-content-center gap-1 btn btn-outline-info"
        >
          <FcGoogle /> Autentificare cu Contul Google
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
