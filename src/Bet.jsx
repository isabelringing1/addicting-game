import { useState, useRef } from "react";

const Bet = (props) => {
  const { bet, diamonds } = props;

  const [betButtonPressed, setBetButtonPressed] = useState(-1);
  const [betInputClassName, setBetInputClassName] = useState("");
  const [payout, setPayout] = useState("");
  const [confirmedBet, setConfirmedBet] = useState(-1);

  const setBetInputRef = useRef(null);

  const onBetButtonPressed = (i) => {
    setBetButtonPressed(i);
  };

  const onInput = () => {
    if (setBetInputRef.current.value.length > 4) {
      setBetInputClassName("bet-input-smaller");
    } else if (setBetInputRef.current.value.length > 3) {
      setBetInputClassName("bet-input-small");
    } else {
      setBetInputClassName("");
    }
    if (!isSetBetButtonDisabled()) {
      setPayout(parseInt(setBetInputRef.current.value) * 2);
    } else {
      setPayout(0);
    }
  };

  const isSetBetButtonDisabled = () => {
    if (
      setBetInputRef.current &&
      setBetInputRef.current.value &&
      !isNaN(parseInt(setBetInputRef.current.value))
    ) {
      var input = parseInt(setBetInputRef.current.value);
      return input > diamonds || input <= 0;
    }
    return true;
  };

  const onConfirmPressed = () => {
    setConfirmedBet(parseInt(setBetInputRef.current.value));
  };

  return (
    <div className="bet">
      {confirmedBet != -1 && (
        <svg className="animated-border" viewBox="0 0 100 100">
          <rect
            x="1"
            y="1"
            width="98"
            height="35"
            rx={5}
            ry={5}
            pathLength={1}
            style={{
              stroke: "#e2e2e2",
              strokeWidth: `0.15dvh`,
              animationDuration: `2s`,
            }}
          />
        </svg>
      )}

      <div className="bet-title">
        Next number is <b>ODD</b>?
      </div>
      {confirmedBet == -1 && (
        <div className="bet-left-column">
          {betButtonPressed != 1 && (
            <div className="bet-option" id="bet-option-0">
              <button
                className={
                  "bet-button bet-green" +
                  (betButtonPressed == 0 ? " bet-button-confirmed" : "")
                }
                onClick={() => onBetButtonPressed(0)}
              >
                {bet.options[0]}
              </button>
              <span
                className={
                  "bet-odds " +
                  (bet.chances[0] >= 50 ? " bet-good" : " bet-bad")
                }
              >
                {bet.chances[0]}%
              </span>
            </div>
          )}
          {betButtonPressed == 1 && (
            <div className="bet-option" id="bet-option-confirm">
              <button
                className="bet-button"
                id="bet-button-confirm"
                disabled={isSetBetButtonDisabled()}
                onClick={onConfirmPressed}
              >
                CONFIRM
              </button>
            </div>
          )}
          {betButtonPressed != 0 && (
            <div className="bet-option" id="bet-option-1">
              <button
                className={
                  "bet-button bet-red" +
                  (betButtonPressed == 1 ? " bet-button-confirmed" : "")
                }
                onClick={() => onBetButtonPressed(1)}
              >
                {bet.options[1]}
              </button>
              <span
                className={
                  "bet-odds " +
                  (bet.chances[1] >= 50 ? " bet-good" : " bet-bad")
                }
              >
                {bet.chances[1]}%
              </span>
            </div>
          )}

          {betButtonPressed == 0 && (
            <div className="bet-option" id="bet-option-confirm">
              <button
                className="bet-button"
                id="bet-button-confirm"
                disabled={isSetBetButtonDisabled()}
                onClick={onConfirmPressed}
              >
                CONFIRM
              </button>
            </div>
          )}
        </div>
      )}

      {betButtonPressed != -1 && confirmedBet == -1 && (
        <div className="bet-right-column">
          <div className={"set-bet-container " + betInputClassName}>
            &diams;&#xfe0e;
            <input
              type="number"
              onInput={onInput}
              id="set-bet-input"
              className={betInputClassName}
              ref={setBetInputRef}
            ></input>
          </div>
          {payout > 0 && (
            <div className="bet-payout-container">
              Payout: &diams;&#xfe0e;{payout.toLocaleString()}
            </div>
          )}
        </div>
      )}

      {/* AFTER BET CONFIRMED */}
      {confirmedBet != -1 && (
        <div className="bet-left-column bet-confirmed-left">
          <div
            className={
              "bet-odds-big " +
              (bet.chances[0] >= 50 ? " bet-good" : " bet-bad")
            }
          >
            {bet.chances[betButtonPressed]}%
          </div>
          <div className="confirmed-payout-container">
            Pays out &diams;&#xfe0e;{payout.toLocaleString()}{" "}
          </div>
        </div>
      )}

      {confirmedBet != -1 && (
        <div className="bet-right-column bet-confirmed-right">
          <button
            className={
              "bet-button bet-button-confirmed " +
              (betButtonPressed == 0 ? "bet-green" : "bet-red")
            }
          >
            {bet.options[betButtonPressed]}
          </button>
          <div>
            <span className="bet-rolls-container">0/{bet.rolls}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bet;
