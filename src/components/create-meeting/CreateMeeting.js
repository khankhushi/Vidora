import React, { useRef, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";

import Header from "../common/Header";

import Context from "../../context";

import * as cometChatService from "../../services/cometchat";
import * as firebaseService from "../../services/firebase";
import * as uiService from "../../services/ui";

const CreateMeeting = () => {
  const meetingNameRef = useRef("");

  const { user, cometChat } = useContext(Context);

  const createMeeting = async () => {
    try {
      const meetingName = meetingNameRef.current.value;
      if (validator.isEmpty(meetingName)) {
        uiService.alert("Please input the meeting name");
        return;
      }
      uiService.showLoading();
      const meetingId = uuidv4();
      await cometChatService.createGroup({
        cometChat,
        id: meetingId,
        name: meetingName,
      });
      await insertFirebase(meetingId, meetingName);
      meetingNameRef.current.value = "";
      uiService.hideLoading();
      uiService.alert(`${meetingName} was created successfully`);
    } catch (error) {
      uiService.alert(`Failure to create your meeting, please try again`);
    }
  };

  const insertFirebase = async (meetingId, meetingName) => {
    await firebaseService.insert({
      key: "meetings",
      id: meetingId,
      payload: {
        id: meetingId,
        name: meetingName,
        createdBy: user,
      },
    });
  };

  return (
    <React.Fragment>
      <Header />
      <div className="create-meeting">
        <div className="create-meeting__content">
          <div className="create-meeting__container">
            <div className="create-meeting__title">Create Meeting</div>
          </div>
          <div className="create-meeting__form">
            <input
              type="text"
              placeholder="Meeting Name"
              ref={meetingNameRef}
            />
            <button className="create-meeting__btn" onClick={createMeeting}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateMeeting;