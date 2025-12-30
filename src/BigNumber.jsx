import { useState } from "react";
import { getRarityIndex } from "./Util";
import Twinkle from "./Twinkle";

import { DitherShader } from "./dither-shader";
import twinkle from "/assets/twinkle.png";
import twinkleBig from "/assets/twinkle_big.png";
import rarityData from "./json/rarity.json";

export default function BigNumber(props) {
  const { n, numTimesRolled, setShowingNumber } = props;
  const [cn, setCn] = useState("big-number-container");
  var digits = n > 9 ? [Math.floor(n / 10), n % 10] : [n];

  var rarity = getRarityIndex(n);
  var data = rarityData[rarity];
  console.log(data);

  function onClick() {
    setCn("big-number-container zoom-out");
    setTimeout(() => {
      setShowingNumber(-1);
    }, 700);
  }

  function getRandomTwinkleLeft() {
    var randomLeft = Math.random() * 50 + 25 + "vw";
    return randomLeft;
  }

  function getRandomTwinkleTop() {
    var randomTop = Math.random() * 100 + "vh";
    return randomTop;
  }

  return (
    <div className={cn} onClick={onClick}>
      <DitherShader
        src={data.bg_path}
        gridSize={1}
        ditherMode="bayer"
        colorMode={data.color_mode}
        primaryColor={data.primary_color}
        secondaryColor={data.secondary_color}
        threshold={data.threshold}
        customPalette={data.custom_palette}
        className={"big-number-bg " + data.bg_type}
      />

      {Array.from(
        { length: data.num_twinkles },
        (_, i) => (
          <Twinkle data={data} key={"twinkle-" + i} />
        )
        /*Math.random() > 0.3 ? (
          <DitherShader
            src={twinkle}
            key={"twinkle-" + i}
            gridSize={1}
            ditherMode="bayer"
            colorMode={data.color_mode}
            customPalette={data.custom_palette}
            threshold={data.threshold}
            className="twinkle twinkle-small"
            style={{ left: getRandomTwinkleLeft(), top: getRandomTwinkleTop() }}
          />
        ) : (
          <DitherShader
            src={twinkleBig}
            key={"twinkle-" + i}
            gridSize={1}
            ditherMode="bayer"
            colorMode={data.color_mode}
            customPalette={data.custom_palette}
            threshold={data.twinkle_threshold}
            className="twinkle twinkle-big"
            style={{
              left: getRandomTwinkleLeft(),
              top: getRandomTwinkleTop(),
              animationDelay: Math.random() * 2 + "s",
            }}
          />
        )*/
      )}

      <div className="big-numbers">
        {digits.map((digit, i) => {
          return (
            <div
              className="big-number"
              id={"big-number-" + i}
              key={"big-number-" + i}
              style={{
                color: data.font_color,
              }}
            >
              {digit}
            </div>
          );
        })}
      </div>
    </div>
  );
}
