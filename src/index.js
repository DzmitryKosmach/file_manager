import readline from "readline";
import { homedir } from "os";
import { WELCOME, BYE, CURRENT_DIRECTORY_MESSAGE } from "./constants.js";
import { logForUser } from "./utils/logForUser.js";
import { performCommand } from "./performCommand.js";

const start = async () => {
  let currentPath = homedir();
  const userNameArg = process.argv.slice(2, 3).join("");
  let userName;
  if (userNameArg.startsWith("--username=")) {
    userName = userNameArg.split("=", 2)[1];
  } else {
    userName = "No name";
  }

  process.env.currentUserName = userName;

  logForUser(WELCOME, userName);
  console.log(CURRENT_DIRECTORY_MESSAGE, currentPath);

  const commands = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  commands.on("SIGINT", () => {
    logForUser(BYE, userName);
    process.exit();
  });

  commands.on("line", (command) => {
    (async () => {
      performCommand(command, currentPath).then((result) => {
        currentPath = result;
        console.log("\n" + CURRENT_DIRECTORY_MESSAGE, currentPath);
      });
      
    })();
  });
};

start();
