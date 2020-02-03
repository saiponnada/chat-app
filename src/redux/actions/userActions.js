import * as types from "./actionTypes";

export function addCurrentUser(userName, timeStamp) {
  return { type: types.ADD_CURRENT_USER, userName , timeStamp};
}

export function addCurrentUserSuccess(user) {
  return { type: types.ADD_CURRENT_USER_SUCCESS, user };
}
