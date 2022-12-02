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

const rock = ["A", 1];
const paper = ["B", 2];
const scissor = ["C", 3];
const matchWinner = {
  player: ["player", 6],
  oponent: ["oponent", 0],
  draw: ["draw", 3],
};

const determinePlayerChoice = (oponentChoice, playerStrategyValue) => {
  const playerStrategy = {
    X: "loss",
    Y: "draw",
    Z: "win",
  };
  const strategy = playerStrategy[playerStrategyValue];

  switch (strategy) {
    case "loss":
      if (rock.includes(oponentChoice)) return scissor[0];
      if (paper.includes(oponentChoice)) return rock[0];
      if (scissor.includes(oponentChoice)) return paper[0];
    case "draw":
      return oponentChoice;
    case "win":
      if (rock.includes(oponentChoice)) return paper[0];
      if (paper.includes(oponentChoice)) return scissor[0];
      if (scissor.includes(oponentChoice)) return rock[0];
  }

  throw Error("Player choice could not be determined");
};

const processMatch = (pair) => {
  const oponentChoice = pair[0];
  const playerStrategyValue = pair[1];
  const playerChoice = determinePlayerChoice(
    oponentChoice,
    playerStrategyValue
  );

  let matchResult;
  let playerChoiceScore = 0;

  if (rock.includes(playerChoice)) {
    playerChoiceScore = rock[1];

    if (scissor.includes(oponentChoice)) {
      matchResult = matchWinner.player;
    } else if (paper.includes(oponentChoice)) {
      matchResult = matchWinner.oponent;
    } else {
      matchResult = matchWinner.draw;
    }
  } else if (paper.includes(playerChoice)) {
    playerChoiceScore = paper[1];

    if (rock.includes(oponentChoice)) {
      matchResult = matchWinner.player;
    } else if (scissor.includes(oponentChoice)) {
      matchResult = matchWinner.oponent;
    } else {
      matchResult = matchWinner.draw;
    }
  } else if (scissor.includes(playerChoice)) {
    playerChoiceScore = scissor[1];

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
