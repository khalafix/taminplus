import { createStore, applyMiddleware, compose } from "redux";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for we
import { createBrowserHistory } from "history";
import { persistStore, persistReducer } from "redux-persist";
import { routerMiddleware } from "connected-react-router";
import reducers from "../reducers";
const persistConfig = {
  key: "root",
  storage,
  /*  blacklist: ["tagsView"], */
};

export const history = createBrowserHistory();
const persistedReducer = persistReducer(persistConfig, reducers(history));
//const composeEnhancers = compose;
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const routeMiddleware = routerMiddleware(history);
const middlewares = [routeMiddleware];
export default function configureStore(initialState) {
  let store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  let persistor = persistStore(store);
  return { store, persistor };
}
