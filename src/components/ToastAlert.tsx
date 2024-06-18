import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Props {
  containerId?: string;
}
const ToastAlert = ({ containerId }: Props) => {
  return (
    <ToastContainer
      containerId={containerId && containerId}
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Slide}
    />
  );
};

export default ToastAlert;
