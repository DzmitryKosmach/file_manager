import { rename as renamePromise } from "fs/promises";
import { resolve, dirname } from "path";
import { OPERATION_FAILED } from "../constants.js";

export const rn = async (currentPath, filePath, fileNameTo) => {
  try {
    const filePathFrom = resolve(currentPath, filePath);
    const __dirname = dirname(filePathFrom);
    const filePathTo = resolve(__dirname, fileNameTo);

    await renamePromise(filePathFrom, filePathTo);
  } catch (error) {
    throw Error(OPERATION_FAILED);
  }
};
