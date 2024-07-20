import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase-config";
import getUserRole from "../utilities/getUserRole";
import getUserStatus from "../utilities/getUserStatus";
import showToast, { Method } from "../utilities/showToast";
import useUserStatusStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";

const SignInWithGoogleButton = () => {
  const setStatus = useUserStatusStore((s) => s.setStatus);
  const setRole = useUserStatusStore((s) => s.setRole);
  const navigate = useNavigate();

  // handle sign in with google
  const handleSignInWithPopup = async () => {
    try {
      await signInWithPopup(auth, provider);
      //check user status
      const newUserStatus = auth.currentUser ? await getUserStatus() : false;
      setStatus(newUserStatus);
      //check user role
      const newUserRole = auth.currentUser
        ? await getUserRole(auth.currentUser.uid)
        : false;
      setRole(newUserRole);
      showToast("Te-ai autentificat cu succes!", Method.Success, () =>
        navigate("/")
      );
    } catch (err: any) {
      const errorMessage = err.message;
      console.error(errorMessage);
      showToast("Emailul sau Parola introdusă este greșită.", Method.Error);
    }
  };
  return (
    <button
      onClick={handleSignInWithPopup}
      type="button"
      className="w-100 d-flex align-items-center justify-content-center gap-1 btn btn-outline-info"
    >
      <FcGoogle /> Conectare cu Google
    </button>
  );
};

export default SignInWithGoogleButton;
