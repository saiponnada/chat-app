import React from "react";

export default function ChatHeader({ roomName, users, currentUserName }) {
  const getUsers = users => {
    if (users.length > 0) {
      let userString = users.join(", ");
      if (currentUserName === "") {
        return <span>{userString}</span>;
      }
      if (!users.includes(currentUserName)) {
        return <span>{userString}</span>;
      } else {
        return (
          <span>
            <span className="text-primary">
              {users.length > 1 ? currentUserName + ", " : currentUserName}
            </span>
            {users.filter(x => x !== currentUserName).join(", ")}
          </span>
        );
      }
    }
  };
  return (
    <div className="chatHeader px-3 pt-4">
      <h3>{roomName}</h3>
      {getUsers(users)}
    </div>
  );
}
