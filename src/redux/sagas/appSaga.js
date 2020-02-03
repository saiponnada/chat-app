import * as Api from "../../api/Api";
import {
  put,
  takeEvery,
  takeLatest,
  call,
  select,
  delay
} from "redux-saga/effects";
import { addCurrentUserSuccess } from "../actions/userActions";
import {
  loadRoomsSuccess,
  loadRoomDetailsSuccess,
  postMessageSuccess
} from "../actions/chatActions";
import { beginApiCall, apiCallError } from "../actions/apiStatusActions";
import * as types from "../actions/actionTypes";

export function* getRooms(action) {
  try {
    yield put(beginApiCall());
    const rooms = yield call(Api.getRooms);
    //sort rooms by userName
    let items = rooms.concat();
    items.sort(function(a, b) {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    yield put(loadRoomsSuccess(items));
  } catch (error) {
    yield put(apiCallError(error));
    throw error;
  }
}

export function* getRoomDetails(action) {
  try {
    while (true) {
      yield put(beginApiCall());
      const details = yield call(Api.getRoomsDetails, action.roomId);
      const messages = yield call(Api.getRoomMessages, action.roomId);
      const rooms = yield select(state => state.rooms);
      const room = rooms.find(room => room.id === details.id);
      const json = {
        ...room,
        users: details.users,
        messages
      };
      yield put(loadRoomDetailsSuccess(json));
      //delay polling by debounce 1 sec
      yield delay(1000);
    }
  } catch (error) {
    yield put(apiCallError(error));
    throw error;
  }
}

export function* addUser(action) {
  try {
    yield put(beginApiCall());
    if (action.userName) {
      let currentUser = {
        name: action.userName,
        timeStamp: action.timeStamp ? action.timeStamp : new Date()
      };
      yield put(addCurrentUserSuccess(currentUser));
    }
  } catch (error) {
    yield put(apiCallError(error));
    throw error;
  }
}

export function* postMessage(action) {
  try {
    yield put(beginApiCall());
    const response = yield call(Api.postMessage, action.roomId, action.data);
    if (response.id) {
      yield put(postMessageSuccess(response));
    } else {
      yield put(apiCallError("Message post failed."));
    }
  } catch (error) {
    yield put(apiCallError(error));
    throw error;
  }
}

export function* watchAddUser() {
  yield takeEvery(types.ADD_CURRENT_USER, addUser);
}

export function* watchGetRooms() {
  yield takeLatest(types.FETCH_ROOMS, getRooms);
}

export function* watchGetRoomDetails() {
  yield takeLatest(types.FETCH_ROOM_DETAILS, getRoomDetails);
}

export function* watchPostMessage() {
  yield takeEvery(types.REQUEST_POST_MESSAGE, postMessage);
}
