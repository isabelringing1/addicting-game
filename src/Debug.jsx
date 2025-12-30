import { useRef, useState, useEffect } from "react";
import { getRarity } from "./Util";

const Debug = (props) => {
  const { rolls, numbers, setHearts, rollNumber } = props;
  const [showDebug, setShowDebug] = useState(false);
  const heartsInputRef = useRef(null);
  const numberInputRef = useRef(null);

  var isLocalHost =
    location.hostname === "localhost" || location.hostname === "127.0.0.1";

  const toggleShowDebug = () => {
    setShowDebug((prevShowDebug) => !prevShowDebug);
  };
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "KeyD" && isLocalHost) {
        toggleShowDebug();
      }
    });
  }, []);

  return (
    showDebug && (
      <div id="debug">
        {rolls.map((roll, i) => (
          <div key={"debug-roll-" + i}>
            Rolled {roll}, {getRarity(roll)} ({numbers[roll]} times)
          </div>
        ))}
        <div>
          <input type="number" ref={heartsInputRef} />
          <button
            onClick={() => {
              setHearts(heartsInputRef.current.value);
            }}
          >
            Set ♥
          </button>
        </div>

        <div>
          <input type="number" ref={numberInputRef} />
          <button
            onClick={() => {
              rollNumber(null, parseInt(numberInputRef.current.value));
            }}
          >
            Roll #
          </button>
        </div>
      </div>
    )
  );
};

export default Debug;
