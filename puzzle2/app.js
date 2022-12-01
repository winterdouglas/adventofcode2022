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

const group = (array) => {
  let groupIndex = 0;
  return array.reduce((acc, current) => {
    if (current) {
      acc[groupIndex] = [...(acc[groupIndex] || []), parseInt(current, 10)];
    } else {
      ++groupIndex;
    }
    return acc;
  }, []);
};

const sum = (array) => {
  return array.reduce((acc, current) => acc + current, 0);
};

const sumGroups = (groups) => {
  return groups.reduce((acc, current) => {
    acc = [...acc, sum(current)];
    return acc;
  }, []);
};

const top = (array, take) => {
  return array.sort((a, b) => b - a).slice(0, take);
};

const app = () => {
  const data = readInput();
  const array = asArray(data);
  const grouped = group(array);
  const sumArray = sumGroups(grouped);
  const top3 = top(sumArray, 3);
  const result = sum(top3);
  console.log(result);
};

app();
