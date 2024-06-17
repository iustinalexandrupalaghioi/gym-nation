import { Slide, ToastOptions, toast } from "react-toastify";
export enum Method {
  Success = "success",
  Error = "error",
  Warning = "warning",
}
const showToast = (
  message: string,
  method: string,
  onClose?: (props?: any) => void
) => {
  const options: ToastOptions = {
    position: "top-center",
    autoClose: 2000,
    className: "bg-body-tertiary shadow mt-3",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
    onClose: onClose && onClose,
  };

  switch (method) {
    case Method.Success:
      toast.success(message, options);
      break;
    case Method.Error:
      toast.error(message, options);
      break;
    case Method.Warning:
      toast.warning(message, options);
      break;
    default:
      toast.info(message, options);
      break;
  }
};
export default showToast;
