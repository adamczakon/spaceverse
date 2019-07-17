import { combineReducers } from "redux";
import flightReducer from "./flightReducer";
import touristReducer from "./touristReducer";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";

export default combineReducers({
  flightReducer,
  touristReducer,
  authReducer,
  alertReducer
});
