const fs = require("fs");

const readInput = () => {
  try {
    return fs.readFileSync("input.txt", "utf8");
  } catch (err) {
    console.error(err);
  }
};

const toLines = (data) => data.split(/\r?\n/);

const toArray = (line) => line.split("").map((v) => parseInt(v, 10));

const buildMatrix = (lines) => {
  return lines.reduce((acc, current, index) => {
    acc[index] = toArray(current);
    return acc;
  }, []);
};

const lineVisibility = (matrix, lineIndex, columnIndex) => {
  const target = matrix[lineIndex][columnIndex];
  const left = matrix[lineIndex].slice(0, columnIndex);
  const right = matrix[lineIndex].slice(
    columnIndex + 1,
    matrix[lineIndex].length
  );

  return target > Math.max(...left) || target > Math.max(...right);
};

const getColumnAsArray = (matrix, columnIndex) => {
  return matrix.map((line) => line[columnIndex]);
};

const columnVisibility = (matrix, lineIndex, columnIndex) => {
  const target = matrix[lineIndex][columnIndex];
  const column = getColumnAsArray(matrix, columnIndex);
  const top = column.slice(0, lineIndex);
  const bottom = column.slice(lineIndex + 1, matrix.length);

  return target > Math.max(...top) || target > Math.max(...bottom);
};

const isVisible = (matrix, lineIndex, columnIndex) => {
  if (
    lineIndex === 0 ||
    columnIndex === 0 ||
    lineIndex === matrix.length - 1 ||
    columnIndex === matrix[lineIndex].length - 1
  ) {
    return true;
  }

  const isLineVisible = lineVisibility(matrix, lineIndex, columnIndex);
  const isColumnVisible = columnVisibility(matrix, lineIndex, columnIndex);

  if (isLineVisible || isColumnVisible) {
    return true;
  }

  return false;
};

const traverse = (matrix) => {
  let visibleCount = 0;

  for (let lineIndex = 0; lineIndex < matrix.length; lineIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < matrix[lineIndex].length;
      columnIndex++
    ) {
      const visible = isVisible(matrix, lineIndex, columnIndex);
      if (visible) ++visibleCount;
    }
  }

  return visibleCount;
};

const app = () => {
  const data = readInput();
  const lines = toLines(data);
  const matrix = buildMatrix(lines);
  const result = traverse(matrix);

  console.log(result);
};

app();
