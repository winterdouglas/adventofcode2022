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
    const half = current.length / 2
    const firstHalf = current.slice(0, half);
    const secondHalf = current.slice(half, current.length)

    acc = [...acc, [[...firstHalf], [...secondHalf]]]
    return acc;
  }, []);
};

const findDuplicates = (pair) => {
  const first = pair[0];
  const second = pair[1];

  const duplicate = first.filter((value, _index, _array) => second.indexOf(value) > -1)[0];
  if (!duplicate) throw Error('No duplicates found for pair');
  return duplicate;
}

const findAllDuplicates = (pairs) => {
  return pairs.flatMap(findDuplicates);
}

const toPriorities = (array) => {
  return array.map((value) => { 
    const charCode = value.charCodeAt(0);
    if (charCode >= 97) return charCode - 97 + 1;
    else return charCode - 65 + 26 + 1;
  });
}

const sum = (priorities) => {
  return priorities.reduce((acc, curr) => acc + curr, 0);
}

const app = () => {
  const data = readInput();
  const array = asArray(data);
  const pairs = toPairs(array);
  const duplicates = findAllDuplicates(pairs);
  const priorities = toPriorities(duplicates);
  const result = sum(priorities);

  console.log(result);
};

app();
