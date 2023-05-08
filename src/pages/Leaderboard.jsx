import React from "react";
import LeaderboardRow from "../components/LeaderboardRow";
import { Link } from "react-router-dom";

function Leaderboard() {
  return (
    <section className="leaderboard">
      <Link className="nav-btn" to="/">
        უკან
      </Link>
      <h1>ლიდერბორდი</h1>
      <p>ყველაზე მზრუნველები</p>
      <div class="leaderboard-cont">
        <LeaderboardRow />
        <LeaderboardRow />
        <LeaderboardRow />
        <LeaderboardRow />
        <LeaderboardRow />
        <LeaderboardRow />
        <LeaderboardRow /> <LeaderboardRow />
        <LeaderboardRow />
        <LeaderboardRow />
        <LeaderboardRow /> <LeaderboardRow />
        <LeaderboardRow />
        <LeaderboardRow />
        <LeaderboardRow /> <LeaderboardRow />
        <LeaderboardRow />
        <LeaderboardRow />
        <LeaderboardRow /> <LeaderboardRow />
        <LeaderboardRow />
        <LeaderboardRow />
        <LeaderboardRow />
      </div>
    </section>
  );
}

export default Leaderboard;
