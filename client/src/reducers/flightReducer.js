import {
  GET_FLIGHTS,
  GET_FLIGHT_DETAILS,
  ADD_FLIGHT,
  DELETE_FLIGHT,
  UPDATE_FLIGHT_TOURISTS,
  FLIGHT_ADD_TOURIST,
  FLIGHT_REMOVE_TOURIST,
  FLIGHTS_LOADING
} from "../actions/types";

const initialState = {
  flights: [],
  flightDetails: [],
  tourists: [],
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FLIGHTS:
      return {
        ...state,
        flights: action.payload,
        loading: false
      };
    case GET_FLIGHT_DETAILS:
      return {
        ...state,
        flightDetails: action.payload,
        loading: false
      };
    case ADD_FLIGHT:
      return {
        ...state,
        flights: [...state.flights, action.payload]
      };
    case DELETE_FLIGHT:
      return {
        ...state,
        flights: state.flights.filter(flight => flight._id !== action.payload)
      };
    case FLIGHT_ADD_TOURIST:
      return {
        ...state,
        flights: state.flights.map(flight =>
          flight._id === action.payload.flightId
            ? {
                ...flight,
                tourists: [...flight.tourists, action.payload.touristId]
              }
            : flight
        ),
        flightDetails: {
          ...state.flightDetails,
          tourists: [...state.flightDetails.tourists, action.payload.touristId]
        }
      };
    case FLIGHT_REMOVE_TOURIST:
      return {
        ...state,
        flightDetails: {
          ...state.flightDetails,
          tourists: [
            ...state.flightDetails.tourists.filter(
              tourist => tourist !== action.payload.touristId
            )
          ]
        },
        flights: state.flights.map(flight =>
          flight._id === action.payload.flightId
            ? {
                ...flight,
                tourists: [
                  ...flight.tourists.filter(
                    tourist => tourist !== action.payload.touristId
                  )
                ]
              }
            : flight
        )
      };
    case UPDATE_FLIGHT_TOURISTS:
      return {
        ...state
      };
    case FLIGHTS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
