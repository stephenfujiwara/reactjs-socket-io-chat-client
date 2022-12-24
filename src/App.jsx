import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const navigate = useNavigate();

  function handleFormSubmit() {
    navigate("/chat", { state: { username, room } });
  }

  return (
    <div className="absolute w-full h-full grid place-items-center">
      <div className="flex flex-col items-center">
        <h3 className="text-4xl mb-4">Join a Chat</h3>
        <input
          type="text"
          placeholder="Name..."
          onChange={(e) => setUsername(e.target.value)}
          className="mb-2 border-2 rounded-md border-blue-500 px-4 py-2 focus:outline-none focus:border-green-500"
          onKeyDown={(e) => {
            e.key === "Enter" && username && room && handleFormSubmit();
          }}
        />
        <input
          type="text"
          placeholder="Room ID..."
          onChange={(e) => setRoom(e.target.value)}
          className="mb-4 border-2 rounded-md border-blue-500 px-4 py-2 focus:outline-none focus:border-green-500"
          onKeyDown={(e) => {
            e.key === "Enter" && username && room && handleFormSubmit();
          }}
        />
        <Link to="/chat" state={{ username, room }}>
          <button
            disabled={!username || !room}
            className="bg-green-500 text-white rounded-md px-4 py-2 hover:shadow-md disabled:cursor-not-allowed"
          >
            Join Room
          </button>
        </Link>
        <h4 className="text-xs pt-2">
          (Open up a second tab to test it out with yourself!)
        </h4>
      </div>
    </div>
  );
}

export default App;
