import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Game from "./pages/Game";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";
import io from "socket.io-client";
import backgroundMusic from "/background.mp3";

const socket = io("http://localhost:3000");

function App() {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
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

  function handleBackgroundImageChange() {
    const backgroundImageUrl = `/background-${
      Math.floor(Math.random() * 5) + 1
    }.gif`;
    setBackgroundImageUrl(backgroundImageUrl);
  }

  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <button onClick={handleBackgroundImageChange} className="nav-btn left">
        ფოტოს შეცვლა
      </button>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Game socket={socket} />} />
          <Route path="/login" element={<Login socket={socket} />} />
          <Route
            path="/leaderboard"
            element={<Leaderboard socket={socket} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
