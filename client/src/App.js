import './App.css';
import io from "socket.io-client";
import { useEffect, useState} from 'react';
const socket = io.connect("http://localhost:3001");

function App() {

  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [room, setRoom] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message, room })
    setMessage("")
  }
  const fixRoom = () => {
    if(room !== ""){
      socket.emit("join_room", room);
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data)
      setReceivedMessage(data.message)
    })
  }, [socket])
  

  return (
    <div className="App">
      <input value={message} placeholder='Type something...' onChange={(event) => setMessage(event.target.value)} />
      <button onClick={sendMessage}>Send Message</button>
      <div>
        <input value={room} placeholder='Enter Room Number' onChange={(event) => setRoom(event.target.value)} />
        <button onClick={fixRoom}>Join Room</button>
      </div>
      <h1>Messages:</h1>
      <h3>{receivedMessage}</h3>
    </div>
  );
}

export default App;
