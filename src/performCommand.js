import { ls } from "./commands/ls.js";
import { up } from "./commands/up.js";
import { cd } from "./commands/cd.js";
import { os } from "./commands/os.js";
import { cat } from "./commands/cat.js";
import { add } from "./commands/add.js";
import { rn } from "./commands/rn.js";
import { cp } from "./commands/cp.js";
import { mv } from "./commands/mv.js";
import { rm } from "./commands/rm.js";
import { hash } from "./commands/hash.js";
import { compress } from "./commands/compress.js";
import { decompress } from "./commands/decompress.js";
import { BYE, FAILED_INPUT } from "./constants.js";
import { logForUser } from "./utils/logForUser.js";

const COMMAND_EXIT = ".exit"

const checkCommandName = (command, commandName) => {
  return command.startsWith(commandName) ? command : null;
};

export const performCommand = async (command, currentPath) => {
  try {
    switch (command) {
      case ls.name:
        await ls(currentPath);
        break;

      case up.name:
        currentPath = await up(currentPath);
        break;

      case checkCommandName(command, cd.name):
        currentPath = await cd(currentPath, command.split(" ", 2)[1]);
        break;

      case checkCommandName(command, os.name):
        await os(command.split(" ", 2)[1]);
        break;

      case checkCommandName(command, cat.name):
        await cat(currentPath, command.split(" ", 2)[1]);
        break;

      case checkCommandName(command, add.name):
        await add(currentPath, command.split(" ", 2)[1]);
        break;

      case checkCommandName(command, rn.name):
        const fileArgs = command.split(" ", 3);
        const filePathFrom = fileArgs[1];
        const fileNameTo = fileArgs[2];
        await rn(currentPath, filePathFrom, fileNameTo);
        break;

      case checkCommandName(command, cp.name):
        const copyFileArgs = command.split(" ", 3);
        const copyfilePathFrom = copyFileArgs[1];
        const copyPathTo = copyFileArgs[2];
        await cp(currentPath, copyfilePathFrom, copyPathTo);
        break;

      case checkCommandName(command, mv.name):
        const moveFileArgs = command.split(" ", 3);
        const movefilePathFrom = moveFileArgs[1];
        const movePathTo = moveFileArgs[2];
        await mv(currentPath, movefilePathFrom, movePathTo);
        break;

      case checkCommandName(command, rm.name):
        await rm(currentPath, command.split(" ", 2)[1]);
        break;

      case checkCommandName(command, hash.name):
        await hash(currentPath, command.split(" ", 2)[1]);
        break;

      case checkCommandName(command, compress.name):
        const cmFileArgs = command.split(" ", 3);
        const cmfilePathFrom = cmFileArgs[1];
        const cmPathTo = cmFileArgs[2];
        await compress(currentPath, cmfilePathFrom, cmPathTo);
        break;

      case checkCommandName(command, decompress.name):
        const decmFileArgs = command.split(" ", 3);
        const decmfilePathFrom = decmFileArgs[1];
        const decmPathTo = decmFileArgs[2];
        await decompress(currentPath, decmfilePathFrom, decmPathTo);
        break;
      
      case COMMAND_EXIT:
        logForUser(BYE, process.env.currentUserName);
        process.exit();        

      default:
        throw new Error(FAILED_INPUT);
    }
  } catch (error) {
    console.log(error.message);
  }

  return currentPath;
};
