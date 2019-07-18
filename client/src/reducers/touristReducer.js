import {
  GET_TOURISTS,
  GET_TOURISTS_IN_FLIGHT,
  ADD_TOURIST,
  DELETE_TOURIST,
  TOURIST_ADD_FLIGHT,
  TOURIST_REMOVE_FLIGHT,
  GET_TOURIST_DETAILS
} from "../actions/types";

const initialState = {
  tourists: [],
  touristDetails: [],
  touristsInFlight: [],
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TOURISTS:
      return {
        ...state,
        tourists: action.payload,
        loading: false
      };
    case GET_TOURISTS_IN_FLIGHT:
      return {
        ...state,
        touristsInFlight: action.payload,
        loading: false
      };
    case GET_TOURIST_DETAILS:
      return {
        ...state,
        touristDetails: action.payload,
        loading: false
      };
    case ADD_TOURIST:
      return {
        ...state,
        tourists: [...state.tourists, action.payload]
      };
    case DELETE_TOURIST:
      return {
        ...state,
        tourists: state.tourists.filter(
          tourist => tourist._id !== action.payload
        )
      };
    case TOURIST_ADD_FLIGHT:
      return {
        ...state,
        touristDetails: {
          ...state.touristDetails,
          flightId: action.payload.flightId
        },
        tourists: state.tourists.map(tourist => {
          if (tourist.id === action.payload.touristId) {
            tourist.flightId = action.payload.flightId;
          }
          return tourist;
        })
      };
    case TOURIST_REMOVE_FLIGHT:
      return {
        ...state,
        touristDetails: (state.touristDetails,
        (state.touristDetails.flightId = "")),
        tourists: state.tourists.map(tourist => {
          if (tourist.id === action.payload.touristId) {
            tourist.flightId = "";
          }
          return tourist;
        })
      };

    default:
      return state;
  }
}
