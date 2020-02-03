import React from "react";
import ReactEmoji from "react-emoji";

export default function ChatMessages({ messages, name }) {
  const userName = name.trim().toLowerCase();
  return (
    <div className="chatMessages px-3 d-flex flex-column">
      <div className="emptyDiv"></div>
      <div className="d-flex flex-column">
        {messages.map((item, index) => {
          return userName === item.name.trim().toLowerCase() ? (
            <div className="d-flex justify-content-end mt-2 mb-3" key={index}>
              <div className="messageContainer sentText">
                <p className="messageText m-0">
                  {ReactEmoji.emojify(item.message)}
                </p>
              </div>
            </div>
          ) : (
            <div key={index}>
              <div className="d-flex justify-content-start mt-2">
                <div className="messageContainer">
                  <p className="messageText m-0">
                    {ReactEmoji.emojify(item.message)}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-start mt-1 mb-3">
                <p className="authorName">{item.name}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-flex" id="emptyScrollDiv"></div>
    </div>
  );
}
