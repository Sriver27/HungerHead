// reducer.js
import { FETCH_DATA_REQUEST,FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "./actionTypes";

const initialState = {
  data: {},
  loading:false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        [action.payload.api]: {
          data: action.payload.data,
          loading:false,
          error: null,
        },
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        [action.payload.api]: {
          data: {},
          loading:false,
          error: action.payload.error,
        },
      };
    default:
      return state;
  }
};

export default reducer;
