import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function roomReducer(state = initialState.rooms, action) {
  switch (action.type) {
    case types.LOAD_ROOMS_SUCCESS:
      return [...state, ...action.rooms];
    case types.LOAD_ROOM_DETAILS_SUCCESS:
      return state.map(
        room => (room.id === action.room.id ? action.room : room)
      );
    default:
      return state;
  } 
}