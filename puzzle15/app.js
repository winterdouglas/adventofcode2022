const fs = require("fs");

const readInput = () => {
  try {
    return fs.readFileSync("input.txt", "utf8");
  } catch (err) {
    console.error(err);
  }
};

const toLines = (data) => data.split(/\r?\n/);

const toArray = (line) => line.split('').map(v => parseInt(v, 10));

const app = () => {
  const data = readInput();
  const lines = toLines(data);
  const 

  console.log(array)
};

app();
