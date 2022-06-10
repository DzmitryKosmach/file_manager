import { writeFile } from "fs/promises";
import { resolve } from "path";
import { isFilePathExist } from "../utils/isFilePathExist.js";
import { OPERATION_FAILED } from "../constants.js";

export const add = async (currentPath, fileName) => {
  try {
    const filePath = resolve(currentPath, fileName);

    if (await isFilePathExist(filePath)) throw new Error();

    await writeFile(filePath, "", { flag: "wx" });
  } catch (error) {
    throw Error(OPERATION_FAILED);
  }
};
