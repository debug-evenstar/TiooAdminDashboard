import { toast } from "react-toastify";

import { alertConstants } from "./alertConstants";

export const alertActions = {
  success,
  error,
  warning,
  clear,
};

function success(message:any) {
  if (!message) return;
  toast.dismiss(message);
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    toastId: message,
  });
  return { type: alertConstants.OK, message };
}

function warning(message:any) {
  if (!message) return;
  toast.dismiss(message);
  toast.warning(message, {
    position: toast.POSITION.TOP_RIGHT,
    toastId: message,
  });
  return { type: alertConstants.WARNING, message };
}

function error(message:any) {
  if (!message) return;
  toast.dismiss(message);
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    toastId: message,
  });
  return { type: alertConstants.ERROR, message };
}

function clear() {
  toast.dismiss();
  return { type: alertConstants.CLEAR };
}
