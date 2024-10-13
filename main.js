import readline from "node:readline/promises";

import * as navigation from "./commands/navigation/index.js";

// *********************** general ***********************
const args = process.argv.slice(2);
let username = "";
args.forEach((arg) => {
  if (arg.startsWith("--username=")) {
    username = arg.split("=")[1];
  }
});

const allowedCommands = ["up", "cd", "ls", ".exit"];

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

  while (true) {
    try {
      const input = await rl.question("Print command: \n");
      const trimmedInput = input.trim();
      const [command, argument] = trimmedInput.split(" ");

      if (!allowedCommands.includes(command)) {
        throw new Error(`Unknown operation: ${command}`);
      }

      if (command === "cd") {
        await navigation.cd(argument);
      }
      if (trimmedInput === "up") {
        navigation.up();
      }
      if (trimmedInput === "ls") {
        await navigation.ls();
      }
      if (trimmedInput === ".exit") {
        exitProgram();
      }
      navigation.showCurrentWorkingDirectory();
    } catch (error) {
      console.log(`Operation failed: ${error.message}`);
    }
  }
};

function exitProgram() {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  navigation.showCurrentWorkingDirectory();
  process.exit(0);
}

main();
