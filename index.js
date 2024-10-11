import readline from "node:readline";

// *********************** welcoming ***********************
const args = process.argv.slice(2);
let username = "";

args.forEach((arg) => {
  if (arg.startsWith("--username=")) {
    username = arg.split("=")[1];
  }
});

console.log(`Welcome to the File Manager, ${username}!`);

// *********************** finalization ***********************
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("SIGINT", () => exitProgram());

rl.on("line", (input) => {
  if (input.trim() === ".exit") exitProgram();
});

function exitProgram() {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
}

// *********************** current directory ***********************
