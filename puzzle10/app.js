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

const split = (line) => {
  return line.match(/.{1,4}/g).map((val) => val.trim());
};

const extractData = (lines) => {
  return lines
    .slice(0, 8)
    .reverse()
    .reduce((acc, current) => {
      const columns = split(current);
      for (let i = 0; i < 9; i++) {
        if (!acc[i]) {
          acc[i] = [];
        }
        if (columns[i]) {
          acc[i] = [...acc[i], columns[i]];
        }
      }
      return acc;
    }, []);
};

const extractCommands = (lines) => {
  return lines.slice(10).reduce((acc, current, index) => {
    const commands = current.match(/\d+/g).map((v) => parseInt(v, 10));
    acc = [...acc, (acc[index] = commands)];
    return acc;
  }, []);
};

const process = (data, commands) => {
  for (let cIndex = 0; cIndex < commands.length; cIndex++) {
    const command = commands[cIndex];
    const amount = command[0];
    const from = command[1] - 1;
    const to = command[2] - 1;

    data[to] = [...data[to], ...data[from].slice(data[from].length - amount)];
    data[from].splice(data[from].length - amount);
  }
  return data;
};

const getLast = (data) => {
  return data.reduce((acc, current) => {
    const last = current[current.length - 1];
    if (last) {
      acc = acc + [...last][1];
    }
    return acc;
  }, "");
};

const app = () => {
  const input = readInput();
  const lines = asArray(input);
  const data = extractData(lines);
  const commands = extractCommands(lines);
  const processed = process(data, commands);
  const result = getLast(processed);

  console.log(result);
};

app();
