import { useState, useEffect } from "react";

import { DitherShader } from "./dither-shader";
import twinkle from "/twinkle.png";
import twinkleBig from "/twinkle_big.png";

export default function Twinkle(props) {
  const { data } = props;

  const [angle, setAngle] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    setTransform();
  }, []);

  function setTransform() {
    var a = Math.random() * Math.PI * 2;
    var height = window.screen.height;
    var d = (Math.random() * height) / 4 + height / 5;
    setAngle(a);
    setDistance(d);
  }

  return (
    <div
      className="twinkle-container"
      style={{
        transform: `translate(${Math.cos(angle) * distance}px, ${
          Math.sin(angle) * distance
        }px)`,
      }}
    >
      {Math.random() > 0.15 ? (
        <DitherShader
          src={twinkleBig}
          gridSize={2}
          ditherMode="bayer"
          colorMode={data.color_mode}
          customPalette={data.custom_palette}
          threshold={-0.3}
          className="twinkle twinkle-small"
          style={{
            animationDelay: Math.random() + "s",
            filter: "drop-shadow(0 0 0.2vh " + data.twinkle_shadow + ")",
          }}
        />
      ) : (
        <DitherShader
          src={twinkleBig}
          gridSize={2}
          ditherMode="bayer"
          colorMode={data.color_mode}
          customPalette={data.custom_palette}
          threshold={data.threshold}
          className="twinkle twinkle-big"
          style={{
            animationDelay: Math.random() + "s",
            filter: "drop-shadow(0 0 0.2vh " + data.twinkle_shadow + ")",
          }}
        />
      )}
    </div>
  );
}
