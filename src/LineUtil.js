function getLineIntersections(points, top, left, width, height) {
  const rectEdges = [
    [
      { x: left, y: top },
      { x: left + width, y: top },
    ], // top
    [
      { x: left + width, y: top },
      { x: left + width, y: top + height },
    ], // right
    [
      { x: left + width, y: top + height },
      { x: left, y: top + height },
    ], // bottom
    [
      { x: left, y: top + height },
      { x: left, y: top },
    ], // left
  ];

  const intersections = [];
  console.log(rectEdges, points);
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];

    for (const [a, b] of rectEdges) {
      const inter = segmentIntersection(p1, p2, a, b);
      if (inter) intersections.push(inter);
    }
  }

  // return only if it crosses at least twice
  return intersections.length >= 2 ? intersections : null;
}

function segmentIntersection(p1, p2, p3, p4) {
  const denom = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
  if (denom === 0) return null;

  const x =
    ((p1.x * p2.y - p1.y * p2.x) * (p3.x - p4.x) -
      (p1.x - p2.x) * (p3.x * p4.y - p3.y * p4.x)) /
    denom;
  const y =
    ((p1.x * p2.y - p1.y * p2.x) * (p3.y - p4.y) -
      (p1.y - p2.y) * (p3.x * p4.y - p3.y * p4.x)) /
    denom;

  if (
    x < Math.min(p1.x, p2.x) ||
    x > Math.max(p1.x, p2.x) ||
    y < Math.min(p1.y, p2.y) ||
    y > Math.max(p1.y, p2.y)
  )
    return null;
  if (
    x < Math.min(p3.x, p4.x) ||
    x > Math.max(p3.x, p4.x) ||
    y < Math.min(p3.y, p4.y) ||
    y > Math.max(p3.y, p4.y)
  )
    return null;

  return { x, y };
}

function segmentsCanvas(originalCanvas, points) {
  var boundingBox = originalCanvas.getBoundingClientRect();
  const width = boundingBox.width;
  const height = boundingBox.height;
  const top = boundingBox.top;
  const left = boundingBox.left;
  const intersections = getLineIntersections(points, top, left, width, height);
  return intersections && intersections.length > 1;
}

function screenLineToCanvasLine(line, canvas) {
  const rect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const canvasLine = line.map(({ x, y }) => ({
    x: Math.min(Math.max((x - rect.left) * scaleX, 0), canvas.width),
    y: Math.min(Math.max((y - rect.top) * scaleY, 0), canvas.height),
  }));

  return canvasLine;
}

function splitCanvasByLine(originalCanvas, screenPoints) {
  var boundingBox = originalCanvas.getBoundingClientRect();
  console.log(boundingBox);
  console.log(originalCanvas, boundingBox, originalCanvas.width);
  const width = originalCanvas.width;
  const height = boundingBox.height;
  const top = boundingBox.top;
  const left = boundingBox.left;

  var points = screenLineToCanvasLine(screenPoints, originalCanvas);
  const intersections = getLineIntersections(
    screenPoints,
    top,
    left,
    width,
    height
  );
  console.log(points, intersections);
  // if (!intersections || intersections.length < 2) return null;

  // Extend the polyline to include intersection endpoints at edges
  //const fullPath = [intersections[0], ...points, intersections[1]];
  const fullPath = [...points];
  const makeHalfCanvas = (invert = false) => {
    const c = document.createElement("canvas");
    c.width = width;
    c.height = height;

    const ctx = c.getContext("2d");
    ctx.save();

    ctx.beginPath();

    // Start from the first intersection
    ctx.moveTo(fullPath[0].x, fullPath[0].y);
    console.log(fullPath);
    // Draw along the polyline
    for (let i = 1; i < fullPath.length; i++) {
      ctx.lineTo(fullPath[i].x, fullPath[i].y);
    }

    var isBackwards = fullPath[0].x < fullPath[fullPath.length - 1].x ? 0 : 1;

    // Now close the polygon around one side of the canvas
    if (!invert) {
      //bottom half
      if (isBackwards) {
        ctx.lineTo(0, height);
        ctx.lineTo(width, height);
        ctx.lineTo(width, 0);
      } else {
        ctx.lineTo(width, height); //bottom right corner
        ctx.lineTo(0, height); //bottom left corner
        ctx.lineTo(0, 0); //top left corder
      }
    } else {
      // top half
      if (isBackwards) {
        ctx.lineTo(0, height);
        ctx.lineTo(0, 0);
        ctx.lineTo(width, 0);
      } else {
        ctx.lineTo(width, 0);
        ctx.lineTo(0, 0);
        ctx.lineTo(0, height);
      }
    }

    ctx.closePath();
    ctx.clip();

    ctx.drawImage(originalCanvas, 0, 0);
    ctx.restore();
    console.log(ctx, c);

    return c;
  };

  return {
    halfA: makeHalfCanvas(false),
    halfB: makeHalfCanvas(true),
  };
}

export { splitCanvasByLine, segmentsCanvas, screenLineToCanvasLine };
