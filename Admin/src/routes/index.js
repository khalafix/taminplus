import React from "react";
import { Route, Switch } from "react-router-dom";
import Routes from "constants/routes";
import AdminLayout from "layouts/AdminLayout/AdminLayout";
import { Spin } from "antd";
const Index = () => {
  return (
    <AdminLayout>
      <React.Suspense fallback={<Spin className="spin-custom" />}>
        <Switch>
          {Routes.map((route, idx) => {
            return (
              <Route
                key={idx}
                path={route.path}
                exact
                name={route.name}
                render={(props) => <route.component {...props} />}
              />
            );
          })}
        </Switch>
      </React.Suspense>
    </AdminLayout>
  );
};

export default Index;
