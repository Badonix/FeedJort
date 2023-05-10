import React, { useState, useEffect } from "react";
import imgDefault from "../assets/default.png";
import imgHappy from "../assets/smile.png";
import imgOpenMouth from "../assets/open-mouth.png";
import pizza from "../assets/pizza.png";
import burger from "../assets/burger.png";
import shawarma from "../assets/shawarma.png";
import { Link, useNavigate } from "react-router-dom";
import ClickableLink from "../components/ClickableLink";
import eatSound from "/eat.mp3";

function Game({ socket }) {
  const [image, setImage] = useState(imgDefault);
  const [images, setImages] = useState([]);
  const [lastClicked, setLastClicked] = useState(0);
  const [calories, setCalories] = useState(0);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const navigate = useNavigate();
  const divs = [
    { image: pizza, id: 1 },
    { image: burger, id: 2 },
    { image: shawarma, id: 3 },
  ];
  const handleMouseDown = () => {
    if (new Date().getTime() - lastClicked > 230) {
      setLastClicked(new Date().getTime());
      const calorie = Math.floor(Math.random() * 5);
      setCalories((prev) => prev + calorie);
      setImage(imgOpenMouth);
      const audio = new Audio(eatSound);
      audio.play();
      const newImage = {
        image: divs[Math.floor(Math.random() * divs.length)].image,
        x: Math.floor(Math.random() * 100) + "%",
      };
      socket.emit("click", {
        id: localStorage.getItem("id"),
        calorie,
      });
      setImages([...images, newImage]);
    }
  };

  function handleBackgroundImageChange() {
    const backgroundImageUrl = `/background-${
      Math.floor(Math.random() * 5) + 1
    }.gif`;
    setBackgroundImageUrl(backgroundImageUrl);
  }

  const handleMouseUp = () => {
    setImage(imgHappy);
  };

  useEffect(() => {
    let timeout;
    if (images.length > 0) {
      timeout = setTimeout(() => {
        setImages(images.slice(1));
      }, 200);
    }
    return () => clearTimeout(timeout);
  }, [images]);

  useEffect(() => {
    !localStorage.getItem("id") && navigate("/login");
    socket.emit("get_calories", { id: localStorage.getItem("id") });
    socket.on("calories", (data) => {
      setCalories(data.calories);
    });
  }, []);
  return (
    <>
      <main>
        <ClickableLink to="/leaderboard" className="nav-btn">
          ლიდერბორდი
        </ClickableLink>
        <div>
          <h1>გამოკვებე ჯორთი</h1>
          <img
            className="jort"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            onMouseUp={handleMouseUp}
            src={image}
          />

          <div className="food-container">
            {images.map((img, index) => (
              <img
                key={index}
                className="food"
                style={{
                  position: "absolute",
                  left: img.x,
                  top: "50%",
                  animation: `pirshigaqaneba-${index} 0.22s`,
                }}
                src={img.image}
                onAnimationEnd={() => {
                  setImages((prevImages) =>
                    prevImages.filter((_, i) => i !== index)
                  );
                }}
              />
            ))}
          </div>
          <p>კალორია: {calories}</p>
        </div>
      </main>
      <style>
        {images.map(
          (_, index) => `
    @keyframes pirshigaqaneba-${index} {
      0% {
        scale: 0;
      }
      100% {
        top: -180px;
        scale: 1;
        left: 50%;
      }
    }`
        )}
      </style>
    </>
  );
}

export default Game;
