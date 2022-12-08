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

const getLeftScore = (matrix, lineIndex, columnIndex) => {
  if (columnIndex === 0) {
    return 0;
  }

  const target = matrix[lineIndex][columnIndex];

  let score = 0;
  let idx = columnIndex - 1;

  while (idx >= 0) {
    const prev = matrix[lineIndex][idx];
    if (target > prev) {
      ++score;
      --idx;
    } else {
      ++score;
      break;
    }
  }

  return score;
};

const getRightScore = (matrix, lineIndex, columnIndex) => {
  const lastColumnIndex = matrix[lineIndex].length - 1;

  if (columnIndex === lastColumnIndex) {
    return 0;
  }

  const target = matrix[lineIndex][columnIndex];

  let score = 0;
  let idx = columnIndex + 1;

  while (idx <= lastColumnIndex) {
    const next = matrix[lineIndex][idx];
    if (target > next) {
      ++score;
      ++idx;
    } else {
      ++score;
      break;
    }
  }

  return score;
};

const getTopScore = (matrix, lineIndex, columnIndex) => {
  if (lineIndex === 0) {
    return 0;
  }

  const target = matrix[lineIndex][columnIndex];

  let score = 0;
  let idx = lineIndex - 1;

  while (idx >= 0) {
    const prev = matrix[idx][columnIndex];
    if (target > prev) {
      ++score;
      --idx;
    } else {
      ++score;
      break;
    }
  }

  return score;
};

const getBottomScore = (matrix, lineIndex, columnIndex) => {
  const lastLineIndex = matrix.length - 1;

  if (columnIndex === lastLineIndex) {
    return 0;
  }

  const target = matrix[lineIndex][columnIndex];

  let score = 0;
  let idx = lineIndex + 1;

  while (idx <= lastLineIndex) {
    const next = matrix[idx][columnIndex];
    if (target > next) {
      ++score;
      ++idx;
    } else {
      ++score;
      break;
    }
  }

  return score;
};

const getScenicScore = (matrix, lineIndex, columnIndex) => {
  const leftScore = getLeftScore(matrix, lineIndex, columnIndex);
  const rightScore = getRightScore(matrix, lineIndex, columnIndex);
  const topScore = getTopScore(matrix, lineIndex, columnIndex);
  const bottomScore = getBottomScore(matrix, lineIndex, columnIndex);

  return leftScore * rightScore * topScore * bottomScore;
};

const getHighestScenicScore = (matrix) => {
  let highestScenicScore = 0;

  for (let lineIndex = 0; lineIndex < matrix.length; lineIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < matrix[lineIndex].length;
      columnIndex++
    ) {
      const score = getScenicScore(matrix, lineIndex, columnIndex);
      if (score > highestScenicScore) {
        highestScenicScore = score;
      }
    }
  }

  return highestScenicScore;
};

const app = () => {
  const data = readInput();
  const lines = toLines(data);
  const matrix = buildMatrix(lines);
  const result = getHighestScenicScore(matrix);

  console.log(result);
};

app();
