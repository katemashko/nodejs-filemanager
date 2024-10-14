import os from "node:os";

// *********************** EOL ***********************
function getEOL() {
  const osEOL = os.EOL;
  console.log(`System EOL: ${JSON.stringify(osEOL)}`);
}

// *********************** cpus ***********************
function getCpu() {
  const cpus = os.cpus();
  console.log(`Overall amount of CPUs: ${cpus.length}`);

  cpus.forEach((cpu, i) => {
    console.log(
      `CPU ${i + 1}: CPU model ${cpu.model.trim()}; CPU speed ${(
        cpu.speed / 1000
      ).toFixed(2)} GHz`
    );
  });
}

// *********************** homedir ***********************
function getHomeDirectory() {
  const homeDirectory = os.homedir();
  console.log(`Home directory ${homeDirectory}`);
}

// *********************** username ***********************
function getSystemUsername() {
  const systemUserInfo = os.userInfo();
  console.log(`System username: ${systemUserInfo.username}`);
}

// *********************** architecture ***********************
function getCpuArchitecture() {
  const cpuArchitecture = os.arch();
  console.log(`CPU architecture: ${cpuArchitecture}`);
}

export {
  getEOL,
  getCpu,
  getHomeDirectory,
  getSystemUsername,
  getCpuArchitecture,
};
