import * as sagas from "./sagas";

export const rootSaga = sagaMiddleware => {
  Object.keys(sagas).map(e => sagas[e]).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};

