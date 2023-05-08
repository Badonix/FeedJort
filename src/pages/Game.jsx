import React, { useState, useEffect } from "react";
import imgDefault from "../assets/default.png";
import imgHappy from "../assets/smile.png";
import imgOpenMouth from "../assets/open-mouth.png";
import pizza from "../assets/pizza.png";
import burger from "../assets/burger.png";
import shawarma from "../assets/shawarma.png";
import { Link, useNavigate } from "react-router-dom";

function Game() {
  const [image, setImage] = useState(imgDefault);
  const [images, setImages] = useState([]);
  const [lastClicked, setLastClicked] = useState(0);
  const [calories, setCalories] = useState(0);
  const divs = [
    { image: pizza, id: 1 },
    { image: burger, id: 2 },
    { image: shawarma, id: 3 },
  ];
  const navigate = useNavigate();
  const handleMouseDown = () => {
    if (new Date().getTime() - lastClicked > 230) {
      setLastClicked(new Date().getTime());
      setCalories((prev) => prev + Math.floor(Math.random() * 5));
      setImage(imgOpenMouth);
      const newImage = {
        image: divs[Math.floor(Math.random() * divs.length)].image,
        x: Math.floor(Math.random() * 100) + "%",
      };
      setImages([...images, newImage]);
    }
  };

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

  return (
    <>
      <main>
        <Link to="/leaderboard" className="nav-btn">
          ლიდერბორდი
        </Link>
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
