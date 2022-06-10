import { cp } from "./cp.js";
import { rm } from "./rm.js";
import { OPERATION_FAILED } from "../constants.js";

export const mv = async (currentPath, filePath, PathTo) => {
  try {
    await cp(currentPath, filePath, PathTo);

    await rm(currentPath, filePath);
  } catch (error) {
    throw Error(OPERATION_FAILED);
  }
};
