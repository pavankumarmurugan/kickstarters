import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToastSuccess = (msg) => {
  toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const showToastError = (msg) => {
  toast.error(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const showToastNotification = (msg) => {
  toast.warning(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const showToastInfo = (msg) => {
  toast.info(msg, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
