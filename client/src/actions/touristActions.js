import {
  GET_TOURISTS,
  GET_TOURIST_DETAILS,
  GET_TOURISTS_IN_FLIGHT,
  ADD_TOURIST,
  DELETE_TOURIST,
  TOURIST_ADD_FLIGHT,
  TOURIST_REMOVE_FLIGHT,
  TOURISTS_LOADING
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

export const getTourists = () => dispatch => {
  dispatch(setTouristsLoading);
  axios.get("/api/tourists").then(res =>
    dispatch({
      type: GET_TOURISTS,
      payload: res.data
    })
  );
};

export const getTouristsInFlight = id => dispatch => {
  axios.get(`/api/tourists/in_flight/${id}`).then(res =>
    dispatch({
      type: GET_TOURISTS_IN_FLIGHT,
      payload: res.data
    })
  );
};

export const getTouristDetails = id => dispatch => {
  console.log(id);
  axios.get(`/api/tourists/tourist-edit/${id}`).then(res =>
    dispatch({
      type: GET_TOURIST_DETAILS,
      payload: res.data
    })
  );
};

export const addTourist = tourist => dispatch => {
  axios.post("/api/tourists", tourist).then(res =>
    dispatch({
      type: ADD_TOURIST,
      payload: res.data
    })
  );
  dispatch(setAlert("Tourist added", "success"));
};

export const deleteTourist = id => dispatch => {
  axios.delete(`/api/tourists/${id}`).then(res =>
    dispatch({
      type: DELETE_TOURIST,
      payload: id
    })
  );
};

export const touristAddFlight = updateFlight => dispatch => {
  axios.post(`/api/tourists/update`, updateFlight).then(res =>
    dispatch({
      type: TOURIST_ADD_FLIGHT,
      payload: updateFlight
    })
  );
};

export const touristRemoveFlight = updateFlight => dispatch => {
  axios.post(`/api/tourists/remove_flight`, updateFlight).then(res =>
    dispatch({
      type: TOURIST_REMOVE_FLIGHT,
      payload: updateFlight.flightId
    })
  );
};

export const setTouristsLoading = () => {
  return {
    type: TOURISTS_LOADING
  };
};
