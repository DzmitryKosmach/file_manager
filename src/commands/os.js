import { cpus, EOL, homedir, userInfo, arch } from "os";
import { FAILED_INPUT } from "../constants.js";

const EOL_MESSAGE = "The operating system-specific end-of-line marker:";
const CPUS_MESSAGE = "Information about each logical CPU core:";
const HOME_DIR_MESSAGE = "The path of the current user's home directory:";
const USER_NAME_MESSAGE = "The current user name:";
const ARCHITECTURE_MESSAGE =
  "The operating system CPU architecture for which the Node.js binary was compiled:";

const printObject = async (obj, message) => {
  if (message) console.log(message);
  console.dir(obj);
};

export const os = async (arg) => {
  try {
    switch (arg) {
      case "--EOL":
        printObject(EOL, EOL_MESSAGE);
        break;

      case "--cpus":
        printObject(cpus(), CPUS_MESSAGE);
        break;

      case "--homedir":
        printObject(homedir(), HOME_DIR_MESSAGE);
        break;

      case "--username":
        printObject(userInfo()["username"], USER_NAME_MESSAGE);
        break;

      case "--architecture":
        printObject(arch(), ARCHITECTURE_MESSAGE);
        break;

      default:
        throw new Error();
    }
  } catch (err) {
    throw Error(FAILED_INPUT);
  }
};
