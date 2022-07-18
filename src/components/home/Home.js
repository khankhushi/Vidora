import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import Header from "../common/Header";

import * as cometChatService from "../../services/cometchat";
import * as firebaseService from "../../services/firebase";

import Context from "../../context";

const Home = () => {
  const [meetings, setMeetings] = useState([]);

  const { cometChat } = useContext(Context);

  const meetingsRef = useRef(firebaseService.getRef("meetings"));

  const history = useHistory();

  useEffect(() => {
    loadMeetings();
    return () => {
      firebaseService.offRealtimeDatabase(meetingsRef.current);
    };
  }, []);

  const loadMeetings = () => {
    firebaseService.getDataRealtime(meetingsRef, onDataLoaded);
  };

  const onDataLoaded = (val) => {
    if (val) {
      const keys = Object.keys(val);
      const data = keys.map((key) => val[key]);
      setMeetings(data);
    }
  };

  
  const startMeeting = (meeting) => async () => {
    try {
      await cometChatService.joinGroup(cometChat, meeting.id);
      setUpMeeting(meeting);
    } catch (error) {
      setUpMeeting(meeting);
    }
  };

  const setUpMeeting = (meeting) => {
    localStorage.setItem("meeting", JSON.stringify(meeting));
    history.push("/meeting-detail");
  };

  return (
    <React.Fragment>
      <Header />
      <div className="home">
        <h1 className="home_heading">Your Meetings</h1>
        <div className="home_container">
          {meetings?.map((meeting) => (
            <div className="meeting__item" key={meeting.id}>
              <p className="meeting__name">{meeting.name}</p>
              <p className="meeting_id">Meeting ID: {meeting.id}</p>
              <button onClick={startMeeting(meeting)}>Start</button>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;