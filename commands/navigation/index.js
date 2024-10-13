import path from "node:path";
import os from "node:os";
import fs from "node:fs/promises";
import { error } from "node:console";

const homeDirectory = os.homedir();
let currentWorkingDirectory = homeDirectory;
const rootDirectory = path.parse(homeDirectory).root;

function up() {
  if (currentWorkingDirectory != rootDirectory) {
    const parentDirectory = path.resolve(currentWorkingDirectory, "..");
    currentWorkingDirectory = parentDirectory;
  }
}

async function cd(cdPath) {
  if (!cdPath) {
    throw new Error("Invalid input");
  }
  const directoryToSwitch = path.resolve(currentWorkingDirectory, cdPath);
  if (await itemExists(directoryToSwitch)) {
    currentWorkingDirectory = path.resolve(currentWorkingDirectory, cdPath);
  } else {
    throw new Error("Directory does not exist");
  }
}

async function ls() {
  const directories = [];
  const files = [];
  const directoryItems = await fs.readdir(currentWorkingDirectory);

  for (const directoryItem of directoryItems) {
    const itemPath = path.join(currentWorkingDirectory, directoryItem);
    const stat = await fs.stat(itemPath);

    if (stat.isDirectory()) {
      directories.push(directoryItem);
    } else {
      files.push(directoryItem);
    }
  }
  directories.sort();
  files.sort();

  console.log("(index)\tType\t\t Name");
  console.log("----\t----\t\t ----");

  let index = 0;
  directories.forEach((dir) => console.log(`${index++}\tdirectory\t ${dir}`));
  files.forEach((file) => console.log(`${index++}\tfile     \t ${file}`));
}

function showCurrentWorkingDirectory() {
  console.log(`You are currently in ${currentWorkingDirectory}`);
}

async function itemExists(itemPath) {
  try {
    await fs.access(itemPath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

export { up, cd, ls, showCurrentWorkingDirectory, itemExists };
