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

const createCRT = (rows, columns) => {
  const size = rows * columns;

  let row = [];
  for (let index = 0; index < size; index++) {
    row[index] = ".";
  }
  return row;
};

const clock = (onTick) => {
  let cycle = 0;
  let run = true;

  const stop = () => {
    run = false;
  };

  while (run) {
    cycle++;
    if (onTick) onTick(cycle, stop);
  }
};

const print = (crt, rows, columns) => {
  for (let row = 0; row < rows; row++) {
    const begin = row * columns;
    const end = begin + columns;
    const rowData = crt.slice(begin, end);
    console.log(rowData.join(""));
  }
};

const process = (lines) => {
  const rows = 6;
  const columns = 40;

  const instructions = lines.map(toInstruction);
  let instructionIndex = 0;
  let instructionCycles = 0;
  let x = 1;
  let spritePosition = [0, 1, 2];
  let crt = createCRT(rows, columns);

  clock((cycle, stop) => {
    if (instructionIndex === instructions.length) {
      stop();
      print(crt, rows, columns);

      return;
    }

    const [ci, cv] = instructions[instructionIndex];
    switch (ci) {
      case Instruction.noop:
        const noopCyles = 1;

        if (spritePosition.includes(cycle - 1)) {
          crt[cycle - 1] = "#";
        } else {
          crt[cycle - 1] = ".";
        }

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

        if (spritePosition.includes(cycle - 1)) {
          crt[cycle - 1] = "#";
        } else {
          crt[cycle - 1] = ".";
        }

        if (instructionCycles < addxCycles) {
          instructionCycles++;
        }

        if (instructionCycles === addxCycles) {
          x += cv;
          instructionIndex++;
          instructionCycles = 0;

          const row = Math.floor(cycle / columns);

          for (let index = 0; index < spritePosition.length; index++) {
            spritePosition[index] =
              (index === 0 ? x - 1 : index === 1 ? x : x + 1) + row * columns;
          }
        }

        break;
      default:
        throw Error("Instruction not recognized");
    }
  });
};

const app = async () => {
  const data = await readInput();
  const lines = toLines(data);
  process(lines);
};

app();
