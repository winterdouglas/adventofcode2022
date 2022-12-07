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

const parseCommand = (line) => line.slice(2).split(" ");

const buildDirectoryTree = (terminalLines) => {
  const commandIdentifier = "$";
  const rootDir = "/";
  const upperDir = "..";

  const tree = {
    type: "dir",
    name: rootDir,
    size: 0,
    parent: "",
    children: [],
    depth: 0,
  };

  let currentDepth = 0;
  let currentDir = rootDir;

  for (let index = 0; index < terminalLines.length; index++) {
    const line = terminalLines[index];

    if (line.startsWith(commandIdentifier)) {
      const [cmd, cmdArg] = parseCommand(line);
      if (cmd === "cd") {
        if (cmdArg === rootDir) {
          currentDepth = 0;
          currentDir = rootDir;
        } else if (cmdArg === upperDir) {
          --currentDepth;
          currentDir = cmdArg;
        }
      }
    }
  }
};

const app = () => {
  const data = readInput();
  const terminalLines = toArray(data);
  const result = buildDirectoryTree(terminalLines);

  console.log(result);
};

app();
