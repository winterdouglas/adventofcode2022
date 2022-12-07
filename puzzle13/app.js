const fs = require("fs");

// Node {
//   type: 'file' | 'dir'
//   name: ''
//   size: ''
//   children: Node[]
//}

const readInput = () => {
  try {
    return fs.readFileSync("input.txt", "utf8");
  } catch (err) {
    console.error(err);
  }
};

const toArray = (data) => data.split(/\r?\n/);

const buildDirectoryTree = (terminalLines) => {
  return terminalLines.reduce((line) => {
    if (line.startsWith("$")) {
    }
  }, {});
};

const app = () => {
  const data = readInput();
  const terminalLines = toArray(data);
  const result = buildDirectoryTree(terminalLines);

  console.log(result);
};

app();
