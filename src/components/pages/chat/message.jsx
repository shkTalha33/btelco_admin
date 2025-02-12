/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import "./chat.css";
import ChatList from "./chatList";
import ChatMessageList from "./chatMessageList";

// import { profile, searchLogin } from "../../icons/icons";
import { Search } from "react-feather";
import {
  ActiveChatProvider,
  ChatProvider,
  ChatUserProvider,
  ResponsiveChatProvider,
  useActiveChat,
  useChatList,
  useResponsiveChat,
} from "./context";

const ChatMessage = () => {
  const state = useLocation();
  const chatId = state ? state.state : {};
  const location = useLocation();
  const { setChatListData } = useChatList();
  const { activeChatId, setActiveChatId } = useActiveChat();
  const { responsiveChat } = useResponsiveChat();
  const socketRef = useRef();
  const handleError = (error) => {
    // console.error("WebSocket connection error:", error);
    // You might want to set an error state or handle it appropriately
  }

  return (
    <div className="bg-light">
      <div className="min-h-[90vh] container-lg px-0 px-lg-2 mx-auto pt-1 pb-5 ">
        <div className=" pt-5">
          <div>
            <div className="chat_grid">
              <div
                className={`chat_screen ${!responsiveChat ? "" : "d_chat_none"
                  }`}
              >
                <div className="pb-1">
                  <div className="d-flex align-items-center justify-content-between px-3"></div>
                  <hr style={{ color: "#EDEEF0" }} className="mb-1" />
                  <div className="position-relative mx-3 my-[12px]">
                    <span className="position-absolute mt-2 ms-3">
                      {" "}
                      <Search />{" "}
                    </span>
                    <input
                      type="text"
                      placeholder="Search"
                      className="py-2 popins_regular border rounded-3 ps-5 w-100"
                      name=""
                      id=""
                    />
                  </div>
                  <hr style={{ color: "#EDEEF0" }} className="my-1" />
                  <ChatList />
                </div>
              </div>
              <div
                className={`chat_screen ${responsiveChat ? "" : "d_chat_none"
                  } `}
                id="chatScreen"
              >
                {activeChatId ? (
                  <ChatMessageList />
                ) : (
                  <div className="display_flex2 flex-column h-100 w-100">
                    <BiSolidMessageRounded style={{ fontSize: "30px" }} />
                    <h4 className="ms-2 my-0 msg_s00">Select a message</h4>
                    <h6
                      style={{ color: "#2D3D38" }}
                      className="text-center mt-2"
                    >
                      Choose from your existing conversations, start a new one,
                      or just keep swimming.
                    </h6>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Messages = () => {
  return (
    <>
      <ChatProvider>
        <ActiveChatProvider>
          <ChatUserProvider>
            <ResponsiveChatProvider>
              <ChatMessage />
            </ResponsiveChatProvider>
          </ChatUserProvider>
        </ActiveChatProvider>
      </ChatProvider>
    </>
  );
};

export default Messages;
