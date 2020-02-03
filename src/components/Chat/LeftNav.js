import React, { useState } from "react";
import RoomList from "./RoomList";

export default function LeftNav({
  name,
  logTime,
  rooms,
  handleRoomClick,
  alert
}) {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <aside className="leftNav">
      {alert.message !== null && (
        <div
          className={
            showAlert
              ? `alert alert-dismissible fade show alert-danger mt-3 mx-1`
              : `d-none`
          }
          role="alert"
        >
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => setShowAlert(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>Error !! </strong>
          {alert.message}
        </div>
      )}
      <div className="userDetails">
        <div className="userName">{name}</div>
        <span>{logTime}</span>
      </div>
      <div className="roomsList mt-2">
        {rooms && rooms.length > 0 && (
          <RoomList rooms={rooms} handleRoomClick={handleRoomClick} />
        )}
      </div>
    </aside>
  );
}
