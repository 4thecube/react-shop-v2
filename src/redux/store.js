import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
// persistStore kinda window.localStorage shit
import { persistStore } from "redux-persist";

import rootReducer from "./root-reducer";

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
