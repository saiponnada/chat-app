import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function alertReducer(state = initialState.alert, action) {
  switch (action.type) {
    case types.API_CALL_ERROR:
      return { message: action.message, type: "Error" };
    default:
      return state;
  }
}
