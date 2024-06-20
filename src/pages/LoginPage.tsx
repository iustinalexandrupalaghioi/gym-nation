import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import getUserStatus from "../utilities/getUserStatus";
import useUserStatusStore from "../stores/userStore";
import logo from "/images/logo1.png";
import getUserRole from "../utilities/getUserRole";
import showToast, { Method } from "../utilities/showToast";
import ToastAlert from "../components/ToastAlert";
import { FieldValues, useForm } from "react-hook-form";
import SignInWithGoogleButton from "../components/SignInWithGoogleButton";
import LoadingButton from "../components/account/LoadingButton";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const setStatus = useUserStatusStore((s) => s.setStatus);
  const setRole = useUserStatusStore((s) => s.setRole);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormData>();

  // handle sign in with email and password
  const handleSignIn = async (data: FieldValues) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);

      //check user status
      const newUserStatus = auth.currentUser ? await getUserStatus() : false;
      setStatus(newUserStatus);

      //check user role
      const newUserRole = auth.currentUser
        ? await getUserRole(auth.currentUser.uid)
        : false;
      setRole(newUserRole);
      showToast("Te-ai autentificat cu succes", Method.Success, () =>
        navigate("/")
      );
    } catch (error: any) {
      const errorMessage = error.message;
      console.error(errorMessage);
      showToast("Nu s-a putut realiza autentificarea.", Method.Error);
    } finally {
      reset();
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
          onSubmit={handleSubmit(handleSignIn)}
        >
          <ToastAlert />
          <div className="form-group mb-3">
            <label className="text-body-secondary" htmlFor="email">
              Adresă de email
            </label>
            <input
              type="email"
              className="form-control border-0"
              id="email"
              placeholder="nume@exemplu.com"
              {...register("email")}
            />
          </div>
          <div className="form-group mb-3">
            <label className="text-body-secondary" htmlFor="password">
              Parolă
            </label>
            <input
              type="password"
              className="form-control border-0"
              id="password"
              placeholder="Parolă"
              {...register("password")}
            />
          </div>
          <p className="text-body-secondary" style={{ fontSize: "0.8rem" }}>
            Nu ai cont?{" "}
            <span>
              <NavLink
                to="/register"
                className="d-inline-flex nav-link text-light hover hover-primary"
              >
                Înregistrează-te
              </NavLink>
            </span>
          </p>
          {isSubmitting ? (
            <LoadingButton
              styleClass="w-100 btn btn-primary text-light mb-3"
              textContent="Conectare..."
            />
          ) : (
            <button
              className="w-100 btn btn-primary text-light mb-3"
              type="submit"
            >
              Conectare
            </button>
          )}

          <SignInWithGoogleButton />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
