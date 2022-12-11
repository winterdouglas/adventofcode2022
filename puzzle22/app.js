import { readFile } from "fs/promises";

const readInput = async () => {
  try {
    return await readFile("input.txt", { encoding: "utf8" });
  } catch (err) {
    console.error(err);
  }
};

const toLines = (data) => data.split(/\r?\n/);

const groupMonkeys = (lines) => {
  return lines.reduce(
    (acc, current) => {
      if (current === "") {
        acc = [...acc, []];
        return acc;
      }

      acc[acc.length - 1] = [...acc[acc.length - 1], current.trim()];
      return acc;
    },
    [[]]
  );
};

const toInt = (str) => parseInt(str, 10);

const remove = (items, index) => {
  return [...items.slice(0, index), ...items.slice(index + 1)];
};

const parseItems = (line) => {
  return line
    .substring(line.indexOf(":") + 1)
    .trim()
    .split(", ")
    .map(toInt);
};

const operationFunction = (str) => {
  return Function(`return (old) => (${str})`)();
};

const parseOperation = (line) => {
  const expression = line.substring(line.indexOf("=") + 1).trim();
  return operationFunction(expression);
};

const parseTest = (line) => {
  const values = line.split(" ");
  const divisibleBy = toInt(values[values.length - 1]);
  return (value) => value % divisibleBy === 0;
};

const parseTarget = (line) => {
  const values = line.split(" ");
  const target = toInt(values[values.length - 1]);
  return target;
};

const toMonkeys = (groups) => {
  return groups.map(
    ([name, items, operation, test, targetIfTrue, targetIfFalse]) => {
      return {
        name,
        items: parseItems(items),
        operation: parseOperation(operation),
        test: parseTest(test),
        targetIfTrue: parseTarget(targetIfTrue),
        targetIfFalse: parseTarget(targetIfFalse),
        inspected: 0,
      };
    }
  );
};

const lowerWorryLevel = (worryLevel) => {
  return Math.floor(worryLevel / 3);
};

const processMonkeys = (monkeys) => {
  for (let mIndex = 0; mIndex < monkeys.length; mIndex++) {
    const monkey = monkeys[mIndex];

    while (monkey.items.length) {
      monkey.inspected++;

      const item = monkey.items[0];

      const worryLevel = monkey.operation(item);
      //const newWorryLevel = lowerWorryLevel(worryLevel);
      const isDivisible = monkey.test(worryLevel);

      const targetMonkey = isDivisible
        ? monkey.targetIfTrue
        : monkey.targetIfFalse;
      monkeys[targetMonkey].items = [
        ...monkeys[targetMonkey].items,
        worryLevel,
      ];

      const removed = remove(monkey.items, 0);
      monkey.items = removed;
    }
  }
};

const print = (monkeys) => {
  const p = monkeys.map(({ name, inspected }) => ({ name, inspected }));
  console.log(p);
};

const processRounds = (rounds, monkeys) => {
  const snapshotPoints = [
    1, 20, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
  ];

  for (let round = 1; round <= rounds; round++) {
    processMonkeys(monkeys);

    if (snapshotPoints.includes(round)) {
      print(monkeys);
    }
  }

  return monkeys;
};

const monkeyBusiness = (monkeys) => {
  const mostActive = monkeys
    .map(({ inspected }) => inspected)
    .sort((a, b) => b - a)
    .slice(0, 2);
  return mostActive[0] * mostActive[1];
};

const app = async () => {
  const data = await readInput();
  const lines = toLines(data);
  const groups = groupMonkeys(lines);
  const monkeys = toMonkeys(groups);
  const processed = processRounds(10000, monkeys);
  const result = monkeyBusiness(processed);

  //print(processed);
  console.log(result);
};

app();
