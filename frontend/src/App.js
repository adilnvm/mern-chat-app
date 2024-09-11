import "./App.css";
import Homepage from "./Pages/Homepage";
import Chatpage from "./Pages/Chatpage";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import io from 'socket.io-client';
import { ChatProvider } from './Context/ChatProvider';

function App() {
  useEffect(() => {
    const socket = io('http://localhost:5000'); // Replace with your server's URL

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ChatProvider>
      <div className="App">
        <Routes>  
          <Route path="/" element={<Homepage />} exact />
          <Route path="/chats" element={<Chatpage />} />
        </Routes>
      </div>
    </ChatProvider>
  );
}

export default App;
