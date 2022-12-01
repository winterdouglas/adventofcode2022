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

const max = (groups) => {
  return groups.reduce((acc, current) => {
    const result = sum(current);
    if (result > acc) {
      acc = result;
    }
    return acc;
  }, 0);
};

const app = () => {
  const data = readInput();
  const array = asArray(data);
  const grouped = group(array);
  const result = max(grouped);
  console.log(result);
};

app();
