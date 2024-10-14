import readline from "node:readline/promises";

import * as navigation from "./commands/navigation/index.js";
import * as basicFs from "./commands/fs/index.js";
import * as hashFile from "./commands/hash/index.js";

// *********************** general ***********************
const args = process.argv.slice(2);
let username = "";
args.forEach((arg) => {
  if (arg.startsWith("--username=")) {
    username = arg.split("=")[1];
  }
});

const allowedCommands = [
  "up",
  "cd",
  "ls",
  "cat",
  "add",
  "rn",
  "cp",
  "mv",
  "rm",
  "hash",
  ".exit",
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = async () => {
  // *********************** welcoming ***********************
  console.log(`Welcome to the File Manager, ${username}!`);
  navigation.showCurrentWorkingDirectory();

  // *********************** finalization ***********************
  rl.on("SIGINT", () => exitProgram());

  // *********************** commands ***********************
  while (true) {
    try {
      const input = await rl.question("Print command: \n");
      const trimmedInput = input.trim();
      const [command, argumentOne, argumentTwo] = trimmedInput.split(" ");

      if (!allowedCommands.includes(command)) {
        throw new Error(`Unknown operation: ${command}`);
      }

      if (command === "cd") {
        await navigation.cd(argumentOne);
      }
      if (command === "up") {
        navigation.up();
      }
      if (command === "ls") {
        await navigation.ls();
      }

      if (command === "cat") {
        await basicFs.cat(argumentOne);
      }

      if (command === "add") {
        await basicFs.add(argumentOne);
      }

      if (command === "rn") {
        await basicFs.rn(argumentOne, argumentTwo);
      }

      if (command === "cp") {
        await basicFs.cp(argumentOne, argumentTwo);
      }

      if (command === "mv") {
        await basicFs.mv(argumentOne, argumentTwo);
      }

      if (command === "rm") {
        await basicFs.rm(argumentOne);
      }

      if (command === "hash") {
        await hashFile.hash(argumentOne);
      }

      if (command === ".exit") {
        exitProgram();
      }
    } catch (error) {
      console.log(`Operation failed: ${error.message}`);
    } finally {
      navigation.showCurrentWorkingDirectory();
      console.log("\n");
    }
  }
};

// ***********************************************************
function exitProgram() {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  navigation.showCurrentWorkingDirectory();
  process.exit(0);
}

main();
