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

const toPairs = (array) => {
  return array.reduce((acc, current) => {
    acc = [...acc, current.split(" ")];
    return acc;
  }, []);
};

const rock = ["A", "X", 1];
const paper = ["B", "Y", 2];
const scissor = ["C", "Z", 3];
const matchWinner = {
  player: ["player", 6],
  oponent: ["oponent", 0],
  draw: ["draw", 3],
};

const processMatch = (pair) => {
  const oponentChoice = pair[0];
  const playerChoice = pair[1];

  let matchResult;
  let playerChoiceScore = 0;

  if (rock.includes(playerChoice)) {
    playerChoiceScore = rock[2];

    if (scissor.includes(oponentChoice)) {
      matchResult = matchWinner.player;
    } else if (paper.includes(oponentChoice)) {
      matchResult = matchWinner.oponent;
    } else {
      matchResult = matchWinner.draw;
    }
  } else if (paper.includes(playerChoice)) {
    playerChoiceScore = paper[2];

    if (rock.includes(oponentChoice)) {
      matchResult = matchWinner.player;
    } else if (scissor.includes(oponentChoice)) {
      matchResult = matchWinner.oponent;
    } else {
      matchResult = matchWinner.draw;
    }
  } else if (scissor.includes(playerChoice)) {
    playerChoiceScore = scissor[2];

    if (paper.includes(oponentChoice)) {
      matchResult = matchWinner.player;
    } else if (rock.includes(oponentChoice)) {
      matchResult = matchWinner.oponent;
    } else {
      matchResult = matchWinner.draw;
    }
  }

  if (!matchResult) {
    throw Error("The winner could not be determined");
  }

  return [...matchResult, playerChoiceScore];
};

const process = (pairs) => {
  return pairs.reduce((acc, current) => {
    const matchResult = processMatch(current);
    const playerPoints = matchResult[1] + matchResult[2];
    acc += playerPoints;
    return acc;
  }, 0);
};

const app = () => {
  const data = readInput();
  const array = asArray(data);
  const pairs = toPairs(array);
  const result = process(pairs);

  console.log(result);
};

app();
