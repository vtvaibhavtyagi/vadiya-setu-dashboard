import { lazy } from "react";

// project imports
import Loadable from "ui-component/Loadable";
import MinimalLayout from "layout/MinimalLayout";

// login option 3 routing
const AuthLogin3 = Loadable(
  lazy(() => import("views/pages/authentication/authentication3/Login3"))
);
const AuthRegisterUser = Loadable(
  lazy(() => import("views/pages/authentication/authentication3/RegisterUser"))
);
const AuthRegisterDoc = Loadable(
  lazy(() => import("views/pages/authentication/authentication3/RegisterDoc"))
);

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/login",
      element: <AuthLogin3 />,
    },
    {
      path: "/register/user-register",
      element: <AuthRegisterUser />,
    },
    {
      path: "/register/Doctor-register",
      element: <AuthRegisterDoc />,
    },
  ],
};

export default AuthenticationRoutes;
