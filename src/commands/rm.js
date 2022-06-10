import { unlink } from "fs/promises";
import { resolve } from "path";
import { OPERATION_FAILED } from "../constants.js";

export const rm = async (currentPath, filePath) => {
  try {
    const filePathToRemove = resolve(currentPath, filePath);

    await unlink(filePathToRemove);
  } catch (error) {
    throw Error(OPERATION_FAILED);
  }
};
