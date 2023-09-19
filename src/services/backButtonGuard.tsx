import React, { useEffect } from "react";
import { createBrowserHistory } from "history";

const BackButtonGuard = () => {
  useEffect(() => {
    const history = createBrowserHistory();
    const blockedRoute = "/login";
    const handleBackButton = (event: any) => {
      const currentRoute = history.location.pathname;

      if (currentRoute === blockedRoute) {
        event.preventDefault();

        console.log(currentRoute);
        // Do something when the user tries to go back to the login route
        // For example, you can show a toast message or redirect to a different route
      }
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  return null;
};

export default BackButtonGuard;
