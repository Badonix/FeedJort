import React, { useState } from "react";
import { Link } from "react-router-dom";
import clickSound from "/click.mp3";

function ClickableLink(props) {
  const [audio] = useState(new Audio(clickSound));

  const handleClick = () => {
    audio.currentTime = 0;
    audio.play();
  };

  return (
    <Link {...props} onClick={handleClick}>
      {props.children}
    </Link>
  );
}

export default ClickableLink;
