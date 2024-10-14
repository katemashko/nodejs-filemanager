import fs from "node:fs";
import crypto from "crypto";
import path from "node:path";

import * as navigation from "../navigation/index.js";

async function hash(filePath) {
  const fullFilePath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    filePath
  );
  const hash = crypto.createHash("SHA256");
  const readFileStream = fs.createReadStream(fullFilePath);

  readFileStream.on("data", (chunk) => {
    hash.update(chunk);
  });

  return new Promise((res, rej) => {
    readFileStream.on("finish", () => {
      const hexHash = hash.digest("hex");
      console.log(`Hash: ${hexHash}`);
      res();
    });
    readFileStream.on("error", rej);
  });
}

export { hash };
