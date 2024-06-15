import { useNavigate } from "react-router-dom";
import useUserStatusStore from "../../stores/userStore";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
interface Props {
  styleClass: string;
}
const SignOutButton = ({ styleClass }: Props) => {
  const navigate = useNavigate();
  const setStatus = useUserStatusStore((s) => s.setStatus);

  // log out function
  const handleSignOut = async () => {
    if (auth.currentUser) {
      await signOut(auth);
      setStatus(false);
      navigate("/");
    }
  };

  return (
    <button className={styleClass} onClick={handleSignOut}>
      Deconectare
    </button>
  );
};

export default SignOutButton;
