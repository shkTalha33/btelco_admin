/* eslint-disable no-unused-vars */
import React from "react";
import Moment from 'react-moment';


const ChatMessage = ({ message, timestamp, left }) => {
  return (
    <div>
      <div className={`pb-3 ${left ? "chat-message-left " : "chat-message-right"}`}>
        <div>
          <div
            className={`flex-shrink-1  popins_regular fs_08 ${left ? "chat_card_left" : "chat_card_right "
              }`}
            style={{ padding: "0.7rem 0.9rem", marginBottom: "0.2rem", wordWrap: "break-word" }}
          >
            {message}
          </div>
          <div
            className={`text-nowrap fs_07 ${left ? "chat-message-left" : "chat-message-right"
              }`}
            style={{ color: "#848FAC" }}
          >
            <Moment fromNow>
              {timestamp}
            </Moment>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
