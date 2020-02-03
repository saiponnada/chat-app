import React from "react";

export default function MessageBox({ message, setMessage, sendMessage }) {
  return (
    <form className="messageBoxContainer form">
      <div className="d-flex flex-row px-3">
        <input
          type="text"
          name="messageBox"
          aria-label="message text box"
          className="form-control form-control-lg"
          maxLength={500}
          value={message}
          onChange={event => setMessage(event.target.value)}
          placeholder="Type a message..."
          onKeyPress={event =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <button
          type="submit"
          aria-label="Send"
          className="btn btn-link pl-4"
          onClick={event => sendMessage(event)}
        >
          <span className="font-weight-bold h5">Send</span>
        </button>
      </div>
    </form>
  );
}
