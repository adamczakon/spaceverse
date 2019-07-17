import {
  GET_FLIGHTS,
  GET_FLIGHT_DETAILS,
  ADD_FLIGHT,
  DELETE_FLIGHT,
  FLIGHTS_LOADING,
  FLIGHT_ADD_TOURIST,
  FLIGHT_REMOVE_TOURIST
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

export const getFlights = () => dispatch => {
  dispatch(setFlightsLoading);
  axios.get("/api/flights").then(res =>
    dispatch({
      type: GET_FLIGHTS,
      payload: res.data
    })
  );
};

export const getFlightDetails = id => dispatch => {
  axios.get(`/api/flights/flight-edit/${id}`).then(res =>
    dispatch({
      type: GET_FLIGHT_DETAILS,
      payload: res.data
    })
  );
};

export const addFlight = flight => dispatch => {
  axios.post("/api/flights", flight).then(res =>
    dispatch({
      type: ADD_FLIGHT,
      payload: res.data
    })
  );
  dispatch(setAlert("Flight submitted", "success"));
};

export const deleteFlight = id => dispatch => {
  axios.delete(`api/flights/${id}`).then(res =>
    dispatch({
      type: DELETE_FLIGHT,
      payload: id
    })
  );
};

export const flightAddTourist = updateFlight => dispatch => {
  axios.post(`/api/flights/update/add-tourist`, updateFlight).then(res =>
    dispatch({
      type: FLIGHT_ADD_TOURIST,
      payload: updateFlight
    })
  );
};

export const flightRemoveTourist = updateFlight => dispatch => {
  axios.post(`/api/flights/update/remove-tourist`, updateFlight).then(res =>
    dispatch({
      type: FLIGHT_REMOVE_TOURIST,
      payload: updateFlight
    })
  );
};

export const setFlightsLoading = () => {
  return {
    type: FLIGHTS_LOADING
  };
};
