// actions.js
import {
  GET_USER_LOCATION_REQUEST,
  GET_USER_LOCATION_SUCCESS,
  GET_USER_LOCATION_FAILURE,
} from "./actionTypes";

const getUserLocationRequest = () => ({
  type: GET_USER_LOCATION_REQUEST,
});

const getUserLocationSuccess = (location) => ({
  type: GET_USER_LOCATION_SUCCESS,
  payload: location,
});

const getUserLocationFailure = (error) => ({
  type: GET_USER_LOCATION_FAILURE,
  payload: error,
});

export const fetchUserLocation = () => async (dispatch) => {
  dispatch(getUserLocationRequest());

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;
    const location = { lat: latitude, lng: longitude };

    dispatch(getUserLocationSuccess(location));
  } catch (error) {
    dispatch(getUserLocationFailure(error));
  }
};
