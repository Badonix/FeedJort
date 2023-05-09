import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Game from "./pages/Game";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";
import io from "socket.io-client";
import backgroundMusic from "/background.mp3";

const socket = io("https://feedjortback-production.up.railway.app");

function App() {
  function startBackgroundMusic() {
    if (!startBackgroundMusic.audio) {
      startBackgroundMusic.audio = new Audio(backgroundMusic);
      startBackgroundMusic.audio.loop = true;
    }
    if (startBackgroundMusic.audio.paused) {
      startBackgroundMusic.audio.play();
    }
  }

  useEffect(() => {
    window.addEventListener("click", startBackgroundMusic);

    return () => {
      window.removeEventListener("click", startBackgroundMusic);
      if (startBackgroundMusic.audio) {
        startBackgroundMusic.audio.pause();
        startBackgroundMusic.audio = null;
      }
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
