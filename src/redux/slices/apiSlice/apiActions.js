// actions.js
import { FETCH_DATA_REQUEST,FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "./actionTypes";
import axios from "axios";

const fetchDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
  };
}

const fetchDataSuccess = (api, data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: { api, data },
});

const fetchDataFailure = (api, error) => ({
  type: FETCH_DATA_FAILURE,
  payload: { api, error },
});

export const fetchData = (api, url) => async(dispatch) => {
  dispatch(fetchDataRequest());
    try {
      const response = await axios.get(url);
      dispatch(fetchDataSuccess(api,response.data));
    } catch (error) {
      dispatch(fetchDataFailure(api,error.message));
    }
};
