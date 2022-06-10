import { readdir } from "fs/promises";
import { OPERATION_FAILED } from "../constants.js";

export const ls = async (path) => {
  try {
    const files = await readdir(path);
    for (const file of files) console.log(`"${file}"`);
  } catch (err) {
    throw Error(OPERATION_FAILED);
  }
};
