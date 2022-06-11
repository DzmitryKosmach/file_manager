import { createReadStream, createWriteStream } from "fs";
import { resolve, dirname, basename  } from "path";
import { pipeline } from "stream/promises";
import { add } from "../commands/add.js";
import { OPERATION_FAILED } from "../constants.js";
import { isFilePathExist } from "../utils/isFilePathExist.js";

export const cp = async (currentPath, filePath, PathTo) => {
  try {
    const fileFullPathFrom = resolve(currentPath, filePath);
    const dirnameFrom = dirname(fileFullPathFrom);
    const __basename = basename(fileFullPathFrom);
    const fileFullPathTo = resolve(dirnameFrom, PathTo, __basename);
    const dirnameTo = dirname(fileFullPathTo);
  
    if (!(await isFilePathExist(dirnameTo))) throw new Error();
    
    if (!(await isFilePathExist(fileFullPathFrom))) {
      throw new Error();
    } else {
      add(currentPath, fileFullPathTo);
    }

    await pipeline(createReadStream(fileFullPathFrom), createWriteStream(fileFullPathTo));
            
  } catch (err) {
    throw new Error(OPERATION_FAILED);
  }
};
