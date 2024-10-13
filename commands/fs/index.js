import path from "node:path";
import os from "node:os";
import fsPromise from "node:fs/promises";
import fs from "node:fs";

import * as navigation from "../navigation/index.js";

async function cat(filePath) {
  if (!filePath) {
    throw new Error("Invalid input");
  }

  const fullFilePath = path.join(
    navigation.getCurrentWorkingDirectory(),
    filePath
  );
  if (!(await navigation.itemExists(fullFilePath))) {
    throw new Error("Directory does not exist");
  }

  const readFileStream = fs.createReadStream(fullFilePath);
  readFileStream.on("data", (chunk) => {
    process.stdout.write(chunk.toString() + os.EOL);
  });

  return new Promise((res, rej) => {
    readFileStream.on("end", res);
    readFileStream.on("error", rej);
  });
}

export { cat };
