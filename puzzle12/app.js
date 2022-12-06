const fs = require("fs");

const readInput = () => {
  try {
    return fs.readFileSync("input.txt", "utf8");
  } catch (err) {
    console.error(err);
  }
};

const toArray = (buffer) => buffer.split("");

const isUnique = (packet) =>
  packet.filter((value, index, array) => array.indexOf(value) === index)
    .length === packet.length;

const getPacket = (buffer, fromIndex, toIndex) => {
  // Slice end is not inclusive
  return toArray(buffer).slice(fromIndex, toIndex + 1);
};

const process = (buffer) => {
  const packetSize = 14;

  for (let packetIndex = 0; packetIndex < buffer.length; packetIndex++) {
    const endOfPacket = packetIndex + packetSize;
    const endOfPacketIndex = endOfPacket - 1;

    if (endOfPacketIndex === buffer.length - 1) {
      return "Start-of-message marker not found";
    }

    const packet = getPacket(buffer, packetIndex, endOfPacketIndex);

    if (isUnique(packet)) {
      return endOfPacket;
    }
  }
};

const app = () => {
  const buffer = readInput();
  const result = process(buffer);

  console.log(result);
};

app();
