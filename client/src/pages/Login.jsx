import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ socket }) {
  const [nickname, setNickname] = useState("");
  const handleRegister = () => {
    console.log(nickname);
    socket.emit("register", { nickname });
    socket.on("get_id", (data) => {
      console.log(data);
    });
  };
  return (
    <div class="login-page">
      <form onSubmit={handleRegister}>
        <label htmlFor="username">ნიქნეიმი</label>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="რაცგინდა..."
          type="text"
          name="nickname"
          id="nickname"
        />
        <Link to="/" type="submit">
          შესვლა
        </Link>
      </form>
    </div>
  );
}

export default Login;
