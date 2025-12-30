import { useState, useEffect } from "react";
import { DitherShader } from "./dither-shader";
import twinkle from "/assets/twinkle.png";
import twinkleBig from "/assets/twinkle_big.png";

export default function Twinkle(props) {
  const { data } = props;

  const [angle, setAngle] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    setTransform();
    setInterval(() => {
      setTransform();
    }, 1000);
  }, []);

  function setTransform() {
    var a = Math.random() * Math.PI * 2;
    var height = window.screen.height;
    var d = (Math.random() * height) / 2 + height / 2;
    setAngle(a);
    setDistance(d);
  }

  return (
    <DitherShader
      src={twinkle}
      gridSize={1}
      ditherMode="bayer"
      colorMode={data.color_mode}
      customPalette={data.custom_palette}
      threshold={data.threshold}
      className="twinkle twinkle-small"
      style={{
        transform: `translate(${Math.cos(angle) * distance}px, ${
          Math.sin(angle) * distance
        }px)`,
      }}
    />
  );
}
