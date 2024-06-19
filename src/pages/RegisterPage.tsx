import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-config";
import logo from "/images/logo1.png";
import ToastAlert from "../components/ToastAlert";
import showToast, { Method } from "../utilities/showToast";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SignInWithGoogleButton from "../components/SignInWithGoogleButton";
import LoadingButton from "../components/account/LoadingButton";

const schema = z.object({
  lname: z
    .string()
    .min(3, { message: "Numele trebuie să fie de cel puțin 3 caractere" }),
  fname: z
    .string()
    .min(3, { message: "Prenumele trebuie să fie de cel puțin 3 caractere" }),
  email: z.string().email("Adresa de email introdusă nu este validă."),
  password: z
    .string()
    .min(9, { message: "Parola trebuie să fie de cel puțin 9 caractere" }),
});

type FormData = z.infer<typeof schema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    try {
      let { name, email, password } = data;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: `${name.fname} ${name.lname}`,
      });

      showToast("Te-ai înregistrat cu succes", Method.Success, () =>
        navigate("/login")
      );
    } catch (error) {
      showToast(
        "Ceva nu a funcționat. Te rugăm să încerci mai târziu!",
        Method.Error
      );
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <ToastAlert />
          <div className="d-flex gap-2 flex-column flex-md-row">
            <div className="form-group mb-3">
              <label className="text-body-secondary" htmlFor="fname">
                Nume
              </label>
              <input
                type="text"
                className="form-control border-0"
                id="lname"
                placeholder="Popescu"
                {...register("lname")}
              />
              {errors.lname && (
                <p className="text-danger"> {errors.lname.message} </p>
              )}
            </div>
            <div className="form-group mb-3">
              <label className="text-body-secondary" htmlFor="lname">
                Prenume
              </label>
              <input
                type="text"
                className="form-control border-0"
                id="fname"
                placeholder="Marian"
                {...register("fname")}
              />
              {errors.fname && (
                <p className="text-danger"> {errors.fname.message} </p>
              )}
            </div>
          </div>
          <div className="form-group mb-3">
            <label className="text-body-secondary" htmlFor="email">
              Adresă de email
            </label>
            <input
              type="text"
              className="form-control border-0"
              id="email"
              placeholder="nume@exemplu.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-danger"> {errors.email.message} </p>
            )}
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
            {errors.password && (
              <p className="text-danger"> {errors.password.message} </p>
            )}
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
          {isSubmitting ? (
            <LoadingButton
              styleClass="w-100 btn tbn-primary text-light mb-3"
              textContent="Procesare..."
            />
          ) : (
            <button
              className="w-100 btn btn-primary text-light mb-3"
              type="submit"
            >
              Înregistrează-te
            </button>
          )}

          <SignInWithGoogleButton />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
