import React from "react";

export default function RoomList({ rooms, handleRoomClick }) {
  return (
    <ul>
      {rooms.map((room, index) => {
        return (
          <li
            key={index}
            value={room.id}
            onClick={handleRoomClick}
            className="cursor-pointer"
          >
            {room.name}
          </li>
        );
      })}
    </ul>
  );
}
