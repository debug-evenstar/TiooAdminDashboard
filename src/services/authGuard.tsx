import { createBrowserHistory } from "history";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthGuard({ children }: { children: any }) {
  const navigate = useNavigate();
  const history = createBrowserHistory();
  // const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [authCheck, setAuthCheck] = useState(false);

  const blockedRoutes = [
    "/",
    "/login",
    "/new-password",
    "/forgot-password",
    "/freelancer",
    "/school",
  ];

  const shouldRedirect = () => {
    let token = localStorage.getItem("token");

    if (!token && !blockedRoutes.includes(window.location.pathname)) {
      window.location.replace("https://hellotioo.com/login");
      return;
    }

    if (token && blockedRoutes.includes(window.location.pathname)) {
      navigate("/");
      return;
    }

    setAuthCheck(true);
  };

  useEffect(() => {
    shouldRedirect();
  }, [history]);

  return <> {authCheck ? children : null}</>;
}
