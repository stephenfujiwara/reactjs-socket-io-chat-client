import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { BsArrowRightCircle, BsFillArrowRightCircleFill } from "react-icons/bs";

export default function Chat() {
  const location = useLocation();
  const username = location.state.username;
  const room = location.state.room;

  const [message, setMessage] = useState("");
  const [messsageList, setMessageList] = useState([]);

  const [socket, setSocket] = useState(io());

  async function sendMessage() {
    const messageData = {
      room: room,
      author: username,
      message: message,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes() +
        ":" +
        new Date(Date.now()).getMilliseconds(),
    };
    socket.emit("send_message", messageData);
    setMessage("");
  }

  // establish connection and disconnect

  useEffect(() => {
    const newSocket = io(
      "https://flask-socketio-chat-server.onrender.com/chat"
    );
    setSocket(newSocket);
  }, []);

  // event listeners

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join_room", { id: socket.id, room: room });
    });
    socket.on("receive_message", (data) => {
      setMessageList((prevMessageList) => [...prevMessageList, data]);
    });

    return () => socket.disconnect();
  }, [socket]);

  return (
    <div className="absolute w-full h-full grid place-items-center chat-window">
      <Link
        to="/"
        className="absolute right-4 top-4"
        onClick={() => socket.disconnect()}
      >
        <button className=" px-4 py-2 rounded-md border border-pink-500 text-pink-600 ring-1 ring-pink-500">
          Leave Room
        </button>
      </Link>
      <div className="w-1/3 h-2/3">
        {/* chat header */}
        <div className="bg-[#263238] rounded-md flex justify-between">
          <h2 className="text-white text-xl pl-2 py-2">Live Chat</h2>
          <h2 className="text-white text-xl pr-2 py-2">Room #{room}</h2>
        </div>
        {/* chat body */}
        <div className="chat-body">
          <ScrollToBottom className="scroll-container">
            {messsageList.map((messageData) => {
              return (
                <div
                  key={`${socket.id}-${messageData.time}`}
                  id={username === messageData.author ? "you" : "other"}
                  className="message"
                >
                  <div className="message-container">
                    {/* message content */}
                    <div className="message-content">
                      <p>{messageData.message}</p>
                    </div>
                    {/* message metadata */}
                    <div className="message-metadata">
                      <p className="message-time">
                        {messageData.time.split(":")[0] +
                          ":" +
                          messageData.time.split(":")[1]}
                      </p>
                      <p className="message-author">{messageData.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        {/* chat footer (input) */}
        <div className="relative flex gap-2 border rounded-md bg-[#263238]">
          <input
            type="text"
            value={message}
            placeholder="what would you like to say..."
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-500 px-4 py-2 my-2 ml-2 rounded-md w-4/5"
            onKeyDown={(e) => {
              e.key === "Enter" && message && sendMessage();
            }}
          ></input>
          <div className="flex-1 flex items-center relative">
            <button
              disabled={!message}
              onClick={sendMessage}
              className="relative left-[20%]"
            >
              {!message ? (
                <BsArrowRightCircle className="text-3xl" />
              ) : (
                <BsFillArrowRightCircleFill className="text-3xl text-[#43a047]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
