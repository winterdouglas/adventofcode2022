const fs = require("fs");

const readInput = () => {
  try {
    return fs.readFileSync("input.txt", "utf8");
  } catch (err) {
    console.error(err);
  }
};

const asArray = (data) => {
  return data.split(/\r?\n/);
};

const toPairs = (array) => {
  return array.reduce((acc, current) => {
    acc = [...acc, current.split(",")];
    return acc;
  }, []);
};

const toInt = (value) => {
  return parseInt(value, 10);
}

const toRange = (pair) => {
  const rangeString = pair.split("-");
  const from = toInt(rangeString[0]);
  const to = toInt(rangeString[1]);
  return [from, to];
}

const toRanges = (pairs) => {
  return pairs.map(pair => {
    const firstRange = toRange(pair[0]);
    const secondRange = toRange(pair[1]);
    return [[...firstRange],[...secondRange]];
  })
}

const overlaps = (firstRange, secondRange) => {
  const startA = firstRange[0];
  const endA = firstRange[1];
  const startB = secondRange[0];
  const endB = secondRange[1];

  return startA <= endB && endA >= startB;
}

const sumOverlaps = (ranges) => {
  return ranges.reduce((acc, current) => {
    const rangeA = current[0];
    const rangeB = current[1];
    return overlaps(rangeA, rangeB) ? ++acc : acc;
  }, 0);
}

const app = () => {
  const data = readInput();
  const array = asArray(data);
  const pairs = toPairs(array);
  const ranges = toRanges(pairs);
  const result = sumOverlaps(ranges);

  console.log(result);
};

app();
