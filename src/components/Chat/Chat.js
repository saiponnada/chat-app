import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/userActions";
import * as chatActions from "../../redux/actions/chatActions";
import "../../assets/styles/css/Chat/Chat.css";
import * as Utilites from "../Common/Utilities";

import LeftNav from "./LeftNav";
import MessageBox from "./MessageBox";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import Spinner from "../Common/Spinner";

function Chat({
  alert,
  user,
  rooms,
  addUser,
  fetchRooms,
  fetchRoomDetails,
  postMessage,
  ...props
}) {
  const [logTime, setLogTime] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState(-1);
  const [roomDetails, setRoomDetails] = useState({ name: "", messages: [] });
  const [roomUsers, setRoomUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [doScroll, setDoScroll] = useState(true);
  const [hasMessageSent, setHasMessageSent] = useState(false);

  function getTimeOnline(timeStamp) {
    let milliSec = Math.floor(
      new Date().getTime() - new Date(timeStamp).getTime()
    );
    let hh = Math.floor(milliSec / 1000 / 60 / 60);
    milliSec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(milliSec / 1000 / 60);
    milliSec -= mm * 1000 * 60;
    //var ss = Math.floor(milliSec / 1000);
    //milliSec -= ss * 1000;
    let logTime = hh > 1 ? `${hh} hours ` : hh === 1 ? `${hh} hour ` : "";
    logTime += mm > 1 ? `${mm} minutes` : mm === 1 ? `${mm} minute` : "";

    if (hh === 0 && mm === 0) {
      return `Online for less than a minute`;
    }
    return `Online for ${logTime}`;
  }

  useEffect(() => {
    let userName = sessionStorage.getItem("userName");
    if (!userName) {
      //user not registered.
      props.history.push("/");
    } else {
      let timeStamp = sessionStorage.getItem("timeStamp");
      if (!user.name) {
        console.log("welcome back " + userName);
        addUser(userName, timeStamp);
      } else {
        //get time diff
        setLogTime(getTimeOnline(timeStamp));
        (function updateLogTime() {
          setInterval(() => {
            setLogTime(getTimeOnline(timeStamp));
          }, 60 * 1000);
        })();
        fetchRooms();
      }
    }
  }, [user]);

  useEffect(() => {
    if (selectedRoomId !== -1) {
      fetchRoomDetails(selectedRoomId);
    }
  }, [selectedRoomId, fetchRoomDetails]);

  useEffect(() => {
    if (roomDetails.users) {
      setRoomUsers(roomDetails.users);
    }
  }, [roomDetails]);

  useEffect(() => {
    if (selectedRoomId === -1) {
      //select first room id by default
      if (rooms.length > 0) {
        setSelectedRoomId(rooms[0].id);
        setDoScroll(true);
      }
    } else {
      const newRoomDetails = rooms.find(room => room.id === selectedRoomId);
      if (!Utilites.isEqual(newRoomDetails.messages, roomDetails.messages)) {
        setRoomDetails(newRoomDetails);
        setDoScroll(true);
      }
    }
  }, [rooms]);

  useEffect(() => {
    //scroll to bottom
    if (doScroll) {
      setDoScroll(false);
      scrollToBottom();
    }
  }, [doScroll]);

  useEffect(() => {
    //scroll to bottom
    if (hasMessageSent) {
      setHasMessageSent(false);
      fetchRoomDetails(selectedRoomId);
    }
  }, [hasMessageSent]);

  const handleRoomClick = event => {
    event.preventDefault();
    setSelectedRoomId(event.target.value);
  };

  const scrollToBottom = () => {
    const element = document.querySelector("#emptyScrollDiv");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const sendMessage = event => {
    event.preventDefault();
    if (message !== "" && user.name !== "") {
      postMessage(selectedRoomId, {
        name: user.name,
        message
      });
      setMessage("");
      setHasMessageSent(true);
    }
  };

  return (
    <div className="appContainer">
      <LeftNav
        name={user.name ? user.name : ""}
        logTime={logTime}
        rooms={rooms}
        handleRoomClick={handleRoomClick}
        alert={alert}
      />
      <section className="mainContainer">
        {rooms.length === 0 ? (
          <p className="noRooms">No rooms available to chat.</p>
        ) : !roomDetails.name && !roomDetails.messages ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <ChatHeader
              roomName={roomDetails.name}
              users={roomUsers}
              currentUserName={user.name ? user.name : ""}
            />
            <div id="chatList">
              {roomDetails.messages && roomDetails.messages.length > 0 ? (
                <ChatMessages
                  messages={roomDetails.messages}
                  name={user.name ? user.name : ""}
                />
              ) : (
                <div style={{ height: "80vh" }}></div>
              )}
            </div>
            <MessageBox
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </React.Fragment>
        )}
      </section>
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    user: state.user ? state.user : {},
    rooms: state.rooms,
    alert: state.alert,
    apiCallsInProgress: state.apiCallsInProgress
  };
};

const mapDispatchToProps = {
  addUser: userActions.addCurrentUser,
  fetchRooms: chatActions.fetchRooms,
  fetchRoomDetails: chatActions.fetchRoomDetails,
  postMessage: chatActions.postMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
