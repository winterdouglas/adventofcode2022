import { readFile } from "fs/promises";

const readInput = async () => {
  try {
    return await readFile("input.txt", { encoding: "utf8" });
  } catch (err) {
    console.error(err);
  }
};

const toLines = (data) => data.split(/\r?\n/);

const sum = (snapshot) => {
  return Object.values(snapshot).reduce((acc, curr) => {
    acc += curr;
    return acc;
  }, 0);
};

const Instruction = {
  noop: "noop",
  addx: "addx",
};

const toInstruction = (line) => {
  const [i, v] = line.split(" ");
  return i === Instruction.noop ? [i, 0] : [i, parseInt(v, 10)];
};

//const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const clock = (onTick) => {
  let cycle = 0;
  let run = true;

  const stop = () => {
    run = false;
  };

  while (run) {
    cycle++;
    if (onTick) onTick(cycle, stop);
    //await sleep(50);
  }
};

const process = (lines) => {
  const instructions = lines.map(toInstruction);
  let instructionIndex = 0;
  let instructionCycles = 0;
  let x = 1;
  let snapshot = {
    20: 0,
    60: 0,
    100: 0,
    140: 0,
    180: 0,
    220: 0,
  };

  clock((cycle, stop) => {
    if (snapshot[cycle] === 0) {
      snapshot[cycle] = x * cycle;

      console.log([cycle, x]);
    }

    if (instructionIndex === instructions.length) {
      stop();
      console.log(sum(snapshot));
      return;
    }

    const [ci, cv] = instructions[instructionIndex];
    switch (ci) {
      case Instruction.noop:
        const noopCyles = 1;

        if (instructionCycles < noopCyles) {
          instructionCycles++;
        }

        if (instructionCycles === noopCyles) {
          instructionIndex++;
          instructionCycles = 0;
        }

        break;
      case Instruction.addx:
        const addxCycles = 2;

        if (instructionCycles < addxCycles) {
          instructionCycles++;
        }

        if (instructionCycles === addxCycles) {
          x += cv;
          instructionIndex++;
          instructionCycles = 0;
        }

        break;
      default:
        throw Error("Instruction not recognized");
    }

    //console.log([cycle, x]);
  });
};

const app = async () => {
  const data = await readInput();
  const lines = toLines(data);
  process(lines);
};

app();
