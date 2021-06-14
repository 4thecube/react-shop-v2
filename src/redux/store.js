import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
// persistStore kinda window.localStorage shit
import { persistStore } from "redux-persist";
// saga instead of thunk
//import ReduxThunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";

import rootSaga from "./root-saga";
import rootReducer from "./root-reducer";

const sagasMiddlewares = createSagaMiddleware();
const middlewares = [logger, sagasMiddlewares];
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagasMiddlewares.run(rootSaga);

export const persistor = persistStore(store);
