import readline from "node:readline/promises";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// *********************** general ***********************
const args = process.argv.slice(2);
let username = "";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const workingDirectory = `${import.meta.dirname}`;
let currentDirectory = workingDirectory;

// *********************** current directory ***********************
function showCurrentWorkingDirectory() {
  console.log(`You are currently in ${currentDirectory}`);
}

// *********************** change directory path ***********************
// const pathExists = async (directoryPath) => {
//   try {
//     await fs.access(directoryPath, fs.constants.F_OK);
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

// *********************** welcoming ***********************
args.forEach((arg) => {
  if (arg.startsWith("--username=")) {
    username = arg.split("=")[1];
  }
});

console.log(`Welcome to the File Manager, ${username}!`);
showCurrentWorkingDirectory();

while (true) {
  const input = await rl.question("Print command: \n");
  const trimmedInput = input.trim();
  const [command, argument] = trimmedInput.split(" ");
  if (command === "cd") {
    if (argument.startsWith("/")) {
      // TO DO FIX
      currentDirectory = path.resolve(process.chdir(os.homedir()), argument);
    } else {
      currentDirectory = path.resolve(currentDirectory, argument);
    }
  }
  if (trimmedInput === "up") {
    const parentDirectory = path.resolve(currentDirectory, "..");
    currentDirectory = parentDirectory;
  }
  if (trimmedInput === ".exit") {
    exitProgram();
  }
  showCurrentWorkingDirectory();
}

// *********************** finalization ***********************
rl.on("SIGINT", () => exitProgram());

function exitProgram() {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  showCurrentWorkingDirectory();
  process.exit(0);
}
