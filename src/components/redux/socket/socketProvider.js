/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);
  const dispatch = useDispatch(null);

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        const newSocket = io("https://api.valix.co.uk", {
          reconnectionAttempts: 15,
          transports: ["websocket"],
        });
        newSocket.emit("authenticate", token);
        newSocket.on("authenticated", (id) => {
          setSocket(newSocket);
        });
        newSocket.on("connect_error", (error) => {
          // console.error("Socket connection error:", error);
        });

        newSocket.on("unauthorized", (error) => {
          // console.error("Unauthorized socket connection:", error.message);
        });
        socketRef.current = newSocket;
      } catch (error) {
        // console.error("Error initializing socket:", error);
      }
    };
    if (token) {
      initializeSocket();
      console.log("===============Socket Initialize");
    } else {
      console.log("No token found for authentication");
    }
    return () => {
      if (!token && socketRef.current) {
        console.log("Disconnecting socket...");
        socketRef.current.disconnect();
        setSocket(null);
      }
    };
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
