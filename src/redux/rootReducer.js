// reducers/index.js
import { combineReducers } from "redux";
import dataReducer from "./slices/apiSlice/apiReducer";
import locationReducer from "./slices/locationSlice/locationReducer";

const rootReducer = combineReducers({
  data: dataReducer,
  location: locationReducer,
});

export default rootReducer;
