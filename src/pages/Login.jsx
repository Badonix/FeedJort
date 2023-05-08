import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div class="login-page">
      <form>
        <label htmlFor="username">ნიქნეიმი</label>
        <input
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
