// actions.js
import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "./actionTypes";

const fetchDataSuccess = (api, data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: { api, data },
});

const fetchDataFailure = (api, error) => ({
  type: FETCH_DATA_FAILURE,
  payload: { api, error },
});

export const fetchData = (api, url) => (dispatch) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => dispatch(fetchDataSuccess(api, data)))
    .catch((error) => dispatch(fetchDataFailure(api, error)));
};
