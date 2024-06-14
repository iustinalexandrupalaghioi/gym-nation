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
  const navigate = useNavigate();
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in: ", user);
      setCredentials({ email: "", password: "" });
      navigate("/account");
    } catch (error: any) {
      const errorMessage = error.message;
      console.log(errorMessage);
      alert("username sau parola gresite");
    }
  };

  // handle sign in with google
  const handleSignInWithPopup = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, provider);
      const user = userCredentials.user;
      console.log("User signed in: ", user);
      navigate("/account");
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
