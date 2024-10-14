import path from "node:path";
import os from "node:os";
import fsPromise from "node:fs/promises";
import fs from "node:fs";

import * as navigation from "../navigation/index.js";

// *********************** read file ***********************
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

// *********************** create new file ***********************
async function add(newFileName) {
  if (!newFileName) {
    throw new Error("Invalid input");
  }

  const fullFilePath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    newFileName
  );
  if (await navigation.fileExists(fullFilePath)) {
    throw new Error("File already exists");
  }

  const newFile = await fsPromise.open(fullFilePath, "w");
  console.log(`File ${fullFilePath} was created successfully`);
  await newFile.close();
}

// *********************** rename file ***********************
async function rn(filePath, newFileName) {
  if (!newFileName || !filePath) {
    throw new Error("Invalid input");
  }

  const oldFullFilePath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    filePath
  );

  // C:\Users\katem\hello.txt
  // privet.txt
  const newFullFilePath = path.resolve(
    path.dirname(oldFullFilePath),
    newFileName
  );

  if (!(await navigation.fileExists(oldFullFilePath))) {
    throw new Error("File does not exist");
  }

  await fsPromise.rename(oldFullFilePath, newFullFilePath);
  console.log(`File ${oldFullFilePath} was renamed successfully`);
}

// *********************** copy file ***********************
async function cp(sourceFilePath, newFilePath) {
  if (!sourceFilePath || !newFilePath) {
    throw new Error("Invalid input");
  }

  const sourceFullFilePath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    sourceFilePath
  );

  const newFullFilePath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    newFilePath
  );

  if (!(await navigation.fileExists(sourceFullFilePath))) {
    throw new Error("File does not exist");
  }
  if (await navigation.fileExists(newFullFilePath)) {
    throw new Error("File already exists");
  }

  return new Promise((res, rej) => {
    const readFileStream = fs.createReadStream(sourceFullFilePath);
    const writeFileStream = fs.createWriteStream(newFullFilePath);

    readFileStream.on("error", rej);
    writeFileStream.on("error", rej);
    writeFileStream.on("finish", res);

    readFileStream.pipe(writeFileStream);
  });
}

// *********************** move file ***********************
async function mv(sourceFilePath, newFilePath) {
  if (!sourceFilePath || !newFilePath) {
    throw new Error("Invalid input");
  }

  const sourceFullFilePath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    sourceFilePath
  );

  const newFullFilePath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    newFilePath
  );

  if (!(await navigation.fileExists(sourceFullFilePath))) {
    throw new Error("File does not exist");
  }
  if (await navigation.fileExists(newFullFilePath)) {
    throw new Error("File already exists");
  }

  return new Promise((res, rej) => {
    const readFileStream = fs.createReadStream(sourceFullFilePath);
    const writeFileStream = fs.createWriteStream(newFullFilePath);

    readFileStream.on("error", rej);
    writeFileStream.on("error", rej);
    writeFileStream.on("finish", () => {
      console.log(`File ${sourceFullFilePath} was moved to ${newFullFilePath}`);
      fsPromise.unlink(sourceFullFilePath);
      res();
    });

    readFileStream.pipe(writeFileStream);
  });
}

// *********************** delete file ***********************
async function rm(filePath) {
  if (!filePath) {
    throw new Error("Invalid input");
  }

  const fullFilePath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    filePath
  );

  if (!(await navigation.fileExists(fullFilePath))) {
    throw new Error("File does not exist");
  }

  await fsPromise.unlink(fullFilePath);
  console.log(`File ${fullFilePath} was removed`);
}

export { cat, add, rn, cp, mv, rm };
