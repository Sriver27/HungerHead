// store.js
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./rootReducer";
import { createLogger } from "redux-logger";

const logger = createLogger();

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
