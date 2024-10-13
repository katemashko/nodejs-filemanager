import path from "node:path";
import os from "node:os";

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

export { up, showCurrentWorkingDirectory, cd };
