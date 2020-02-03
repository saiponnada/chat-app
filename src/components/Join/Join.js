import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../../assets/styles/css/Join/Join.css";
import * as userActions from "../../redux/actions/userActions";

const Join = ({ addUser }) => {
  const [userName, setUserName] = useState("");

  function handleChange(event) {
    const { value } = event.target;
    //added regex to allow only alpha numeric characters
    //and max length of 50 is set
    const regEx = /^[0-9a-zA-Z \b]+$/;
    if (value === "" || regEx.test(value)) {
      setUserName(event.target.value);
    }
  }

  function handleClick(event) {
    if (!userName) {
      event.preventDefault();
    } else {
      const timeStamp = new Date();
      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("timeStamp", timeStamp);
      addUser(userName, timeStamp);
    }
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer col-lg-4 col-md-5 col-12">
        <input
          type="text"
          name="username"
          aria-label="type your user name"
          value={userName}
          className="form-control form-control-lg mb-4"
          maxLength={50}
          placeholder="Type your username..."
          onChange={handleChange}
        />
        <Link
          to={`/chat/${userName}`}
          className="btn btn-link btn-block p-0"
          onClick={handleClick}
        >
          <button
            type="submit"
            className="btn btn-primary btn-lg col-12"
            aria-label="join the doordash chat"
          >
            Join the DoorDash Chat!
          </button>
        </Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  addUser: userActions.addCurrentUser
};

// traditionally we can dispatch an action using store.dispatch().
// Here we are using a helper function called connect to dispatch actions.
export default connect(null, mapDispatchToProps)(Join);
