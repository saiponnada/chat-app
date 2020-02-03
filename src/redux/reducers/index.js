import user from "./userReducer";
import rooms from "./roomReducer";
import alert from "./alertReducer";
import apiCallsInProgress from "./apiCallStatusReducer";

export default {
  user,
  rooms,
  alert,
  apiCallsInProgress
};