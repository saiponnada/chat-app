import { handleResponse, handleError } from "./apiUtils";
const apiRoot = "http://localhost:8080";

//fetch returns a promise
function fetchAPIData(query) {
  let uri = apiRoot + `/api/${query}`;
  return fetch(uri)
    .then(handleResponse)
    .catch(handleError);
}

export function getRooms() {
  return fetchAPIData(`rooms`);
}

export function getRoomsDetails(roomId) {
  return fetchAPIData(`rooms/${roomId}`);
}

export function getRoomMessages(roomId) {
  return fetchAPIData(`rooms/${roomId}/messages`);
}

export function postMessage(roomId, messageDetails) {
  return fetch(apiRoot + `/api/rooms/${roomId}/messages`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: { "content-type": "application/json" },
    body: JSON.stringify(messageDetails)
  })
    .then(handleResponse)
    .catch(handleError);
}
