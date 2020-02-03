import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import logger from "./middleware/logger";
import crashReporter from "./middleware/crashReporter";
import { rootSaga } from "./rootSaga";
import reducers from "./reducers";

export default function configureStore(history, initialState) {

  const rootReducer = combineReducers({
    ...reducers,
    router : connectRouter(history)
  });

  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, routerMiddleware(history), crashReporter];
  const enhancers = [];

  // In development, use the browser's Redux dev tools extension if installed
  const isDevelopment = process.env.NODE_ENV === "development";
  if (
    isDevelopment &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION__
  ) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    middleware.push(logger);
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );

  //sagas can be initialized only after store is created.
  rootSaga(sagaMiddleware);

  return store;
}
