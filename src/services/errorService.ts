import { alertActions } from "../components/alertActions";
export const sendErrorMsg = (error: any) => {
  if (error.message === "Network Error" && error.code === "ERR_NETWORK") {
    alertActions.error(
      `${error.message}, Please check your internet connection`
    );
    return;
  }
};
