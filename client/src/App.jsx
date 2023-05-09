import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Game from "./pages/Game";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";
import io from "socket.io-client";
import backgroundMusic from "/background.mp3";

const socket = io("http://localhost:3000");

function App() {
  useEffect(() => {
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    audio.volume = 0.25;
    audio.play();

    return () => {
      audio.pause();
    };
  }, []);

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
