import path from "node:path";
import os from "node:os";
import fs from "node:fs/promises";

const homeDirectory = os.homedir();
let currentWorkingDirectory = homeDirectory;
const rootDirectory = path.parse(homeDirectory).root;

function up() {
  if (currentWorkingDirectory != rootDirectory) {
    const parentDirectory = path.resolve(currentWorkingDirectory, "..");
    currentWorkingDirectory = parentDirectory;
  }
}

function cd(cdPath) {
  currentWorkingDirectory = path.resolve(currentWorkingDirectory, cdPath);
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

// const pathExists = async (directoryPath) => {
//   try {
//     await fs.access(directoryPath, fs.constants.F_OK);
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

export { up, showCurrentWorkingDirectory, cd, ls };
