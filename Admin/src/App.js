import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { authenticationServices } from "./services/authenticationServices";
import IntlProvider from "./components/IntelProvider/IntelProvider";
import { getLang } from "utils/helpers";
import Routes from "./routes";
import { Spin } from "antd";

import "./styles/styles.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ForgotPassword from "views/pages/forgot-password/ForgotPassword";
import ResetPassword from "views/pages/reset-password/ResetPassword";
import PublicLayout from "layouts/PublicLayout/PublicLayout";

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const PrivateRoute = ({ component: Component, userLevel, ...props }) =>
{
  return authenticationServices.isAuthenticate() ? (
    <Component {...props} />
  ) : (
    <Redirect to="/login" />
  );
}
  

const App = () => {
  const currentAppLocale = "fa";
  const lang = getLang(currentAppLocale);

  return (
    <IntlProvider locale={currentAppLocale} messages={lang}>
      <React.Suspense fallback={<Spin className="spin-custom" />}>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route path={["/forgot-password", "/register", "/reset-password/:code", "/bidd-interest/:code",
        "/confirmation/:code", "/404", "/500"]}>
            <PublicLayout>
              <Route
                exact
                path="/register"
                name="Register Page"
                render={(props) => <Register {...props} />}
              />
              <Route
                exact
                path="/reset-password/:code"
                name="Reset Password Page"
                render={(props) => <ResetPassword {...props} />}
              />
              <Route
                exact
                path="/forgot-password"
                name="Forgot Password Page"
                render={(props) => <ForgotPassword {...props} />}
              />
              <Route
                exact
                path="/404"
                name="Page 404"
                render={(props) => <Page404 {...props} />}
              />
              <Route
                exact
                path="/500"
                name="Page 500"
                render={(props) => <Page500 {...props} />}
              />
            </PublicLayout>
          </Route>
          <PrivateRoute name="Home" component={Routes} />
        </Switch>
      </React.Suspense>
    </IntlProvider>
  );
};

export default App;
