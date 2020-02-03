import * as types from "./actionTypes";

export function fetchRooms() {
  return { type: types.FETCH_ROOMS };
}

export function loadRoomsSuccess(rooms) {
  return { type: types.LOAD_ROOMS_SUCCESS, rooms };
}

export function fetchRoomDetails(roomId) {
  return { type: types.FETCH_ROOM_DETAILS, roomId };
}

export function loadRoomDetailsSuccess(room) {
  return { type: types.LOAD_ROOM_DETAILS_SUCCESS, room };
}

export function fetchMessages(roomId) {
  return { type: types.FETCH_MESSAGES, roomId };
}

export function loadMessagesSuccess(messages) {
  return { type: types.LOAD_MESSAGES_SUCCESS, messages };
}

export function postMessage(roomId, data) {
  return { type: types.REQUEST_POST_MESSAGE, roomId, data };
}

export function postMessageSuccess(response) {
  return { type: types.LOAD_MESSAGES_SUCCESS, response };
}
