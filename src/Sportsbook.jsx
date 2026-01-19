import { useState } from "react";

import Bet from "./Bet";
import betData from "./json/bets.json";

export default function Sportsbook(props) {
  const { diamonds } = props;
  return (
    <div className="sportsbook-container">
      <div className="sportsbook">
        <div className="shop-title">SPORTSBOOK</div>
        <div className="bets-container">
          <Bet diamonds={diamonds} bet={betData[0]} />
          <Bet diamonds={diamonds} bet={betData[0]} />
        </div>
      </div>
    </div>
  );
}
