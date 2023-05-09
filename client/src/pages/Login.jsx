import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Login({ socket }) {
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState();

  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(nickname);
    socket.emit("register", { nickname });
    socket.on("get_id", (data) => {
      setId(data.id);
      localStorage.setItem("id", data.id);
      navigate("/");
    });
  };
  useEffect(() => {
    localStorage.getItem("id") ? navigate("/") : "";
  }, []);
  return (
    <div className="login-page">
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
