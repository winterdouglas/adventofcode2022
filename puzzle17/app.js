const fs = require("fs");

const readInput = () => {
  try {
    return fs.readFileSync("input.txt", "utf8");
  } catch (err) {
    console.error(err);
  }
};

const toLines = (data) => data.split(/\r?\n/);

const toCommand = (line) => {
  const [direction, steps] = line.split(" ");
  return [direction, parseInt(steps, 10)];
};

const Direction = {
  R: "R",
  L: "L",
  U: "U",
  D: "D",
};

const processHeadStep = (direction, currentPosition) => {
  switch (direction) {
    case Direction.L:
      currentPosition.hX--;
      break;
    case Direction.R:
      currentPosition.hX++;
      break;
    case Direction.U:
      currentPosition.hY--;
      break;
    case Direction.D:
      currentPosition.hY++;
      break;
    default:
      throw Error("Unknown direction");
  }
};

const processTailStep = (direction, currentPosition, prevPosition) => {
  const maxDistance = 2;

  switch (direction) {
    case Direction.L:
      if (Math.abs(currentPosition.hX - currentPosition.tX) >= maxDistance) {
        currentPosition.tX = prevPosition.hX;
        currentPosition.tY = prevPosition.hY;
        currentPosition.visited.add(
          JSON.stringify({ tX: currentPosition.tX, tY: currentPosition.tY })
        );
      }
      break;
    case Direction.R:
      if (Math.abs(currentPosition.hX - currentPosition.tX) >= maxDistance) {
        currentPosition.tX = prevPosition.hX;
        currentPosition.tY = prevPosition.hY;
        currentPosition.visited.add(
          JSON.stringify({ tX: currentPosition.tX, tY: currentPosition.tY })
        );
      }
      break;
    case Direction.U:
      if (Math.abs(currentPosition.hY - currentPosition.tY) >= maxDistance) {
        currentPosition.tX = prevPosition.hX;
        currentPosition.tY = prevPosition.hY;
        currentPosition.visited.add(
          JSON.stringify({ tX: currentPosition.tX, tY: currentPosition.tY })
        );
      }
      break;
    case Direction.D:
      if (Math.abs(currentPosition.hY - currentPosition.tY) >= maxDistance) {
        currentPosition.tX = prevPosition.hX;
        currentPosition.tY = prevPosition.hY;
        currentPosition.visited.add(
          JSON.stringify({ tX: currentPosition.tX, tY: currentPosition.tY })
        );
      }
      break;
    default:
      throw Error("Unknown direction");
  }
};

const process = (lines) => {
  return lines.reduce(
    (accPosition, current) => {
      const [direction, steps] = toCommand(current);

      for (let step = 0; step < steps; step++) {
        const prevPosition = { ...accPosition };
        processHeadStep(direction, accPosition);
        processTailStep(direction, accPosition, prevPosition);
      }

      return accPosition;
    },
    {
      hX: 0,
      hY: 0,
      tX: 0,
      tY: 0,
      visited: new Set(['{"tX":0,"tY":0}']),
    }
  );
};

const app = () => {
  const data = readInput();
  const lines = toLines(data);
  const result = process(lines);

  console.log(result.visited.size);
};

app();
