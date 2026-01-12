import DrawingLine from "./DrawingLine";

function Drawing({ lines }) {
  return (
    <svg className="drawing" id="drawing">
      {lines.map((line, index) => (
        <DrawingLine key={index} line={line} />
      ))}
    </svg>
  );
}

export default Drawing;
