import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Game from "./pages/Game";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game socket={socket} />} />
        <Route path="/login" element={<Login socket={socket} />} />
        <Route path="/leaderboard" element={<Leaderboard socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
Game;
