import React, { useEffect, useState } from "react";
import LeaderboardRow from "../components/LeaderboardRow";
import { Link } from "react-router-dom";
import axios from "axios";
import ClickableLink from "../components/ClickableLink";
function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/leaderboard")
      .then((res) => res.data)
      .then((data) => setLeaderboard(data));
  }, []);
  useEffect(() => {
    leaderboard?.forEach((el) => {
      console.log(el);
    });
  }, [leaderboard]);
  return (
    <section className="leaderboard">
      <ClickableLink className="nav-btn" to="/">
        უკან
      </ClickableLink>
      <h1>ლიდერბორდი</h1>
      <p>ყველაზე მზრუნველები</p>
      <div className="leaderboard-cont">
        {leaderboard.map((el, index) => {
          return el.nickname && <LeaderboardRow data={el} index={index} />;
        })}
      </div>
    </section>
  );
}

export default Leaderboard;
