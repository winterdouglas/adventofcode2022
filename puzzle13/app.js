const fs = require("fs");

const FileType = {
  dir: "dir",
  file: "file",
};

const readInput = () => {
  try {
    return fs.readFileSync("input.txt", "utf8");
  } catch (err) {
    console.error(err);
  }
};

const toArray = (data) => data.split(/\r?\n/);

const parseCommand = (line) => line.slice(2).split(" ");

const parseListing = (line, location) => {
  const [arg, name] = line.split(" ");
  if (arg === FileType.dir) {
    return {
      type: FileType.dir,
      name: name,
      size: 0,
      path: location, // parentId
      fullPath: location === "/" ? `/${name}` : `${location}/${name}`, // id
    };
  } else {
    return {
      type: FileType.file,
      name: name,
      size: parseInt(arg, 10),
      path: location, // parentId
      fullPath: `${location}/${name}`, // id
    };
  }
};

const buildItemList = (terminalLines) => {
  const commandIdentifier = "$";
  const rootDir = "/";
  const upperDir = "..";

  let items = [
    {
      type: FileType.dir,
      name: rootDir,
      size: 0,
      path: null, // parentId
      fullPath: rootDir, // id
    },
  ];
  let currentDir = rootDir;
  let isListing = false;
  let lineIndex = 0;

  while (lineIndex < terminalLines.length) {
    const line = terminalLines[lineIndex];

    if (line.startsWith(commandIdentifier)) {
      isListing = false;

      const [cmd, cmdArg] = parseCommand(line);
      if (cmd === "cd") {
        if (cmdArg === rootDir) {
          currentDir = rootDir;
        } else if (cmdArg === upperDir) {
          currentDir =
            currentDir.substring(0, currentDir.lastIndexOf("/")) || rootDir;
        } else {
          currentDir =
            currentDir === rootDir ? `/${cmdArg}` : `${currentDir}/${cmdArg}`;
        }
      } else if (cmd === "ls") {
        isListing = true;
      }
    } else if (isListing) {
      const item = parseListing(line, currentDir);
      items.push(item);
    }

    lineIndex++;
  }
  return items;
};

const toTree = (arr) => {
  let arrMap = new Map(arr.map((item) => [item.fullPath, item]));
  let tree = [];

  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];

    if (item.path !== null) {
      let parentItem = arrMap.get(item.path);

      if (parentItem) {
        let { children } = parentItem;

        if (children) {
          parentItem.children.push(item);
        } else {
          parentItem.children = [item];
        }
      }
    } else {
      tree.push(item);
    }
  }

  return tree;
};

const app = () => {
  const data = readInput();
  const terminalLines = toArray(data);
  const items = buildItemList(terminalLines);
  const tree = toTree(items);

  console.log(JSON.stringify(tree, null, 2));
};

app();
