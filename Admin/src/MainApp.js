import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import App from "./App";

import { Provider } from "react-redux";
import configureStore, { history } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
export const { store, persistor } = configureStore();

const MainApp = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};

export default MainApp;
