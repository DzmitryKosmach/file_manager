import { resolve } from "path";
import { OPERATION_FAILED } from "../constants.js";
import { isFilePathExist } from "../utils/isFilePathExist.js";

export const cd = async (path, pathTo) => {
  try {
    const newDest = resolve(path, pathTo);

    if (!(await isFilePathExist(newDest))) throw new Error();

    return newDest;
  } catch (err) {
    throw Error(OPERATION_FAILED);
  }
};
