import React from "react";

function LeaderboardRow({ data, index }) {
  return (
    <div
      className={
        data.id == localStorage.getItem("id")
          ? "leaderboard-row current-user"
          : "leaderboard-row"
      }
    >
      <p>{index + 1}</p>
      <p>{data.nickname || "უცნობი ბებია"}</p>
      <p>{data.calories} კალორია</p>
    </div>
  );
}

export default LeaderboardRow;
