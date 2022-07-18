import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";

import { CometChatMessages } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import MeetingHeader from "../meeting-header/MeetingHeader";

import Context from "../../context";

const MeetingDetail = () => {
    const [meeting, setMeeting] = useState();
  
    const { cometChat } = useContext(Context);
  
    const history = useHistory();
  
    useEffect(() => {
      const meeting = JSON.parse(localStorage.getItem("meeting"));
      if (meeting) {
        setMeeting(meeting);
      }
    }, []);
  
    useEffect(() => {
      if (meeting && cometChat) {
        startDirectCall();
      }
    }, [meeting, cometChat]);
  
    const startDirectCall = () => {
      if (cometChat && meeting) {
        const sessionID = meeting.id;
        const audioOnly = false;
        const defaultLayout = true;
        const callSettings = new cometChat.CallSettingsBuilder()
          .enableDefaultLayout(defaultLayout)
          .setSessionID(sessionID)
          .setIsAudioOnlyCall(audioOnly)
          .build();
        cometChat.startCall(
          callSettings,
          document.getElementById("call__screen"),
          new cometChat.OngoingCallListener({
            onUserListUpdated: (userList) => {},
            onCallEnded: (call) => {
              history.push("/");
            },
            onError: (error) => {
              history.push("/");
            },
            onMediaDeviceListUpdated: (deviceList) => {},
            onUserMuted: (userMuted, userMutedBy) => {},
            onScreenShareStarted: () => {},
            onScreenShareStopped: () => {},
          })
        );
      }
    };
  
    if (!meeting || !cometChat) return <React.Fragment></React.Fragment>;
  
    return (
      <React.Fragment>
        <MeetingHeader meeting={meeting} />
        <div className="meeting">
          <div className="meeting__left">
            <div id="call__screen"></div>
          </div>
          <div className="meeting__right">
            <CometChatMessages chatWithGroup={meeting.id} />
          </div>
        </div>
      </React.Fragment>
    );
  };
  
  export default MeetingDetail;