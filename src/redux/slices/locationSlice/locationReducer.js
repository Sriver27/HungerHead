// reducer.js
import {
  GET_USER_LOCATION_REQUEST,
  GET_USER_LOCATION_SUCCESS,
  GET_USER_LOCATION_FAILURE,
} from "./actionTypes";

const initialState = {
  userLocation: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LOCATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_LOCATION_SUCCESS:
      return {
        ...state,
        userLocation: action.payload,
        loading: false,
      };
    case GET_USER_LOCATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
