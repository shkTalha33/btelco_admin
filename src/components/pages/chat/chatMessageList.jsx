/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { ChevronLeft, Send } from "react-feather";
import ChatMessage from "./chatMessage";

import { Fragment, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  useActiveChat,
  useChatList,
  useChatUser,
  useResponsiveChat,
} from "./context";

import Skeleton from "react-loading-skeleton";
import ApiFunction from "../../api/apiFuntions";
import { getUserMessages } from "../../api/ApiRoutesFile";
import { profileavatar } from "../../icons/icon";
import { useSocket } from "../../redux/socket/socketProvider";
import ImageLoader from "./imageLoader";
const ChatMessageList = () => {
  const { userData, get, } = ApiFunction();
  const [chatMsg, setChatMsg] = useState([]);
  const [usersId, setUsersId] = useState("");
  const [lastMsgId, setLastMsgId] = useState("");
  const chatMessagesRef = useRef(null);

  const location = useLocation();
  const dataGet = location?.state;
  const [lastId, setLastId] = useState(0);
  const [count, setCount] = useState(0);

  const [newMsg, setNewMsg] = useState(false);
  // const socketRef = useRef();
  const { setResponsiveChat } = useResponsiveChat();

  const [isLoading3, setIsLoading3] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  //// context APi
  const { chatUser } = useChatUser();
  const { activeChatId } = useActiveChat();
  const { chatListData, setChatListData } = useChatList();
  const socket = useSocket()


  useEffect(() => {
    setLastId(chatMsg[0]?._id);
  }, [chatMsg]);
  useEffect(() => {
    if (socket) {
      socket.on("send-message", (message) => {
        if (
          activeChatId === message?.sender ||
          userData?._id === message?.sender
        ) {
          setChatMsg((prevChat) => [...prevChat, message]);
          const updatedChatlist = chatListData?.map((conversation) => {
            if (conversation?._id === message?.conversationId) {
              if (
                conversation?.lastMsg?.sender === message?.sender ||
                message?.sender === userData?._id ||
                activeChatId === message?.sender
              ) {
                return {
                  ...conversation,
                  lastMsg: message,
                };
              }
            }
            return conversation;
          });
          setChatListData(
            updatedChatlist.sort((a, b) => {
              const lastMsgA = a?.lastMsg;
              const lastMsgB = b?.lastMsg;
              if (!lastMsgA || !lastMsgB) {
                return 0;
              }
              const createdAtA = new Date(lastMsgA?.createdAt);
              const createdAtB = new Date(lastMsgB?.createdAt);
              return createdAtB - createdAtA; // Sort in ascending order for oldest first
            })
          );
        } else {
          const newMsgUser = chatListData?.find(
            (item) => item.otherUser?._id === message?.sender
          );
          if (newMsgUser) {
            const updatedChatlist = chatListData?.map((conversation) => {
              if (conversation?._id === message?.conversationId) {
                if (
                  conversation?.lastMsg?.sender === message?.sender ||
                  message?.sender === userData?._id ||
                  activeChatId === message?.sender
                ) {
                  return {
                    ...conversation,
                    lastMsg: message,
                  };
                }
              }
              return conversation;
            });
            setChatListData(
              updatedChatlist.sort((a, b) => {
                const lastMsgA = a?.lastMsg;
                const lastMsgB = b?.lastMsg;
                if (!lastMsgA || !lastMsgB) {
                  return 0;
                }
                const createdAtA = new Date(lastMsgA?.createdAt);
                const createdAtB = new Date(lastMsgB?.createdAt);
                return createdAtB - createdAtA;
              })
            );
          }
        }
      });
      socket.on("send_message_error", (error) => {
      })
    }
    return () => {
      if (socket) {
        socket.off("send-message")
      }
    };
  }, [activeChatId, chatListData, socket]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const input = document.getElementById("chatInput");
    const message = input.value;
    const data = {
      recipientId: chatUser?.otherUser?._id,
      messageText: message,
      name: chatUser?.otherUser?.fname,
    };
    if (message.trim() !== "") {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      await socket.emit("send-message", data);
      location.state = null;
      input.value = "";
    }
  };

  const getUserChat = (userId) => {
    const apiChat = `${getUserMessages}/${userId}`;
    get(apiChat,)
      .then((res) => {
        if (res?.success) {
          setNewMsg(true);
          setChatMsg(res?.messages?.reverse());
          setIsLoading3(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading3(false);
      })
      .finally(() => {
        setIsLoading3(false);
      });
  };

  useLayoutEffect(() => {
    handleChatClick(activeChatId);
  }, [activeChatId]);
  useEffect(() => {
    if (chatMsg?.length > 0) {
      if (lastId === 0) {
        chatMessagesRef.current.scrollTop =
          chatMessagesRef.current.scrollHeight;
      } else {
        if (newMsg) {
          chatMessagesRef.current.scrollTop =
            chatMessagesRef.current.scrollHeight;
          setNewMsg(true);
        }
      }
    }
  }, [chatMsg]);

  const handleScroll = async () => {
    if (chatMessagesRef.current.scrollTop === 0 && !isLoading3) {
      setNewMsg(false);
      setIsLoading2(true);
      const apiChat = `${getUserMessages}/${usersId}/${lastId}`;

      get(apiChat,)
        .then((res) => {
          if (res?.success) {
            const data = [...res?.messages?.reverse(), ...chatMsg];
            setChatMsg(data);
            setIsLoading2(false);
          } else {
            setIsLoading2(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading2(false);
        })
        .finally(() => {
          setIsLoading2(false);
        });
    } else setIsLoading2(false);
  };

  const handleChatClick = async (userId) => {
    setIsLoading3(true);
    getUserChat(userId);
    setUsersId(userId);
  };

  return (
    <div className="chat_height position-relative">
      <div
        className="d-flex align-items-center bg_dark rounded-4"
        style={{ borderRadius: "8px" }}
      >
        <div>
          <Link
            className="d_left_button bg-dark"
            onClick={() => {
              setResponsiveChat(false);
            }}
          >
            <ChevronLeft />
          </Link>
        </div>

        <div className="w-100 py-2 px-3 d-flex justify-content-between align-items-center">
          {chatListData?.length === 0 || isLoading3 ? (
            <div className="chatSkltonmain w-50 mt-3">
              <Skeleton className="chatSklten0" />
            </div>
          ) : (
            <>
              <div className="d-flex gap-1 algin-items-center">
                <ImageLoader
                  // circeltrue={true}
                  classes={"rounded-circle bg-white chatImg00"}
                  imageUrl={chatUser?.otherUser?.profile || profileavatar}
                />

                <div className="d-flex  flex-column">
                  <>
                    <span className="text-black text-sm fs_11">{`${chatUser?.otherUser?.fname} ${chatUser?.otherUser?.lname}`}</span>
                    <span className="popins_regular text-black text-sm fs_08">
                      {chatUser?.otherUser?.email}
                    </span>
                  </>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="position-relative">
        <div
          ref={chatMessagesRef}
          onScroll={handleScroll}
          className="chat-messages scrolbar px-2 py-3"
        >
          {isLoading3 ? (
            <div className="text-center w-100">
              <Spinner
                style={{
                  width: "20px",
                  height: "20px",
                  marginTop: "3px",
                  borderWidth: "0.15em",
                }}
                animation="border"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              {isLoading2 && (
                <div className="text-center">
                  {" "}
                  <Spinner
                    style={{
                      width: "20px",
                      height: "20px",
                      marginTop: "3px",
                      borderWidth: "0.15em",
                    }}
                    animation="border"
                    role="status"
                  ></Spinner>
                </div>
              )}
              {chatMsg?.length > 0 &&
                chatMsg?.map((msg, index) => (
                  <Fragment key={index}>
                    <ChatMessage
                      left={userData?._id === msg?.sender ? false : true}
                      message={msg?.message}
                      timestamp={`${msg?.createdAt}`}
                    />
                  </Fragment>
                ))}
            </>
          )}
        </div>
      </div>
      <form onSubmit={sendMessage} className="px-3">
        <div className="   w-100">
          <div className="d-flex items-center my-3">
            <div className="position-relative hideFocus2  w-100 me-1">
              <input
                type="text"
                disabled={isLoading3}
                id="chatInput"
                required
                className="form-control rounded-3 ps-2 py-2 fs_10 "
                placeholder="Try to..."
              />
            </div>
            <button
              disabled={isLoading3}
              className="send_btn rounded-3"
              type="submit"
            >
              <Send
                className="text-white p-0 m-0"
                style={{ width: "1.2rem" }}
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatMessageList;
