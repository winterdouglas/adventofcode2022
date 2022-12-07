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

  let items = [];
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

const groupBy = (array, key) => {
  return array.reduce((acc, current) => {
    (acc[current[key]] = acc[current[key]] || []).push(current);
    return acc;
  }, {});
};

const app = () => {
  const data = readInput();
  const terminalLines = toArray(data);
  const items = buildItemList(terminalLines);
  const folders = groupBy(items, "path");
  const folderSizes = Object.keys(folders).reduce((acc, currentFolder) => {
    const children = Object.values(items).filter((item) =>
      item.path.startsWith(currentFolder)
    );
    acc[currentFolder] = children.reduce((accChild, currentChild) => {
      accChild += currentChild.size;
      return accChild;
    }, 0);
    return acc;
  }, {});
  const sum = Object.keys(folderSizes)
    .filter((key) => folderSizes[key] <= 100000)
    .reduce((acc, currentKey) => {
      acc += folderSizes[currentKey];
      return acc;
    }, 0);
  console.log(sum);
};

app();
