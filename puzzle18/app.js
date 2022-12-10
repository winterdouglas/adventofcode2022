const fs = require("fs");

const readInput = () => {
  try {
    return fs.readFileSync("input.txt", "utf8");
  } catch (err) {
    console.error(err);
  }
};

const toLines = (data) => data.split(/\r?\n/);

const Direction = {
  R: "R",
  L: "L",
  U: "U",
  D: "D",
};

const RopeSize = 10;

const toCommand = (line) => {
  const [direction, steps] = line.split(" ");
  return [direction, parseInt(steps, 10)];
};

const createKnots = (size) => {
  let knots = [];
  for (let index = 0; index < size; index++) {
    knots[index] = { x: 0, y: 0 };
  }
  return knots;
};

const copy = (original) => {
  let knots = [];
  for (let index = 0; index < original.length; index++) {
    knots[index] = { ...original[index] };
  }
  return knots;
};

const processHeadStep = (direction, current) => {
  let head = current.knots[0];

  switch (direction) {
    case Direction.L:
      head.x--;
      break;
    case Direction.R:
      head.x++;
      break;
    case Direction.U:
      head.y--;
      break;
    case Direction.D:
      head.y++;
      break;
    default:
      throw Error("Unknown direction");
  }

  console.log([0, head]);
};

const processKnotStep = (current, index, previous) => {
  const maxDistance = 2;
  const currentKnot = current.knots[index];
  const previousKnot = current.knots[index - 1];
  const previousStepKnot = previous[index - 1];

  const shouldMove =
    Math.abs(currentKnot.x - previousKnot.x) >= maxDistance ||
    Math.abs(currentKnot.y - previousKnot.y) >= maxDistance;

  //console.log([index, currentKnot, previousKnot, shouldMove]);

  if (shouldMove) {
    current.knots[index] = { ...previousStepKnot };

    console.log([index, current.knots[index]]);

    if (index === RopeSize - 1) {
      current.visited.add(
        JSON.stringify({
          x: current.knots[index].x,
          y: current.knots[index].y,
        })
      );
    }
  }
};

const processStep = (direction, current) => {
  const previous = copy(current.knots);

  // Moves all rope knots
  for (let index = 0; index < RopeSize; index++) {
    if (index === 0) {
      processHeadStep(direction, current);
    } else {
      processKnotStep(current, index, previous);
    }
  }
};

const process = (lines) => {
  return lines.reduce(
    (accPosition, current) => {
      const [direction, steps] = toCommand(current);

      for (let step = 0; step < steps; step++) {
        processStep(direction, accPosition);
      }

      return accPosition;
    },
    {
      knots: createKnots(RopeSize),
      visited: new Set(['{"x":0,"y":0}']),
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
