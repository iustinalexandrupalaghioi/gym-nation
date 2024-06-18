import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ToastAlert = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
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
