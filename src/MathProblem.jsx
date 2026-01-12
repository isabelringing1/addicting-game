import { useRef, useState } from "react";

export default function MathProblem(props) {
  const { problem, i, onComplete } = props;
  const [stateCn, setStateCn] = useState("");
  const inputRef = useRef(null);
  var sign = " " + problem.operation + " ";

  function onInput(e) {
    if (inputRef.current.value == problem.solution) {
      setStateCn(" correct");
      onComplete(problem.index);
    }
  }

  return (
    <div className={"problem " + stateCn} id={"math-problem-" + i}>
      {problem.numbers[0] + sign + problem.numbers[1]} ={" "}
      <input
        type="number"
        className={"math-input" + stateCn}
        id={"math-problem-input" + i}
        ref={inputRef}
        onInput={onInput}
      />
    </div>
  );
}
