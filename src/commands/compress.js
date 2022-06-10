import { createBrotliCompress } from "zlib";
import { resolve, dirname, basename } from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { BROTLI_EXTENTION, OPERATION_FAILED } from "../constants.js";
import { isFilePathExist } from "../utils/isFilePathExist.js";

export const compress = async (currentPath, filePath, PathTo) => {
  try {
    const fileFullPathFrom = resolve(currentPath, filePath);
    
    if (!(await isFilePathExist(fileFullPathFrom))) throw new Error();

    const dirnameFrom = dirname(fileFullPathFrom);
    const __basename = basename(fileFullPathFrom);
    const fileFullPathTo = resolve(dirnameFrom, PathTo, __basename);
    const fileFullPathToBrotliCompress = fileFullPathTo + BROTLI_EXTENTION;
    
    const brotliCompress  = createBrotliCompress();
    const source = createReadStream(fileFullPathFrom);
    const destination = createWriteStream(fileFullPathToBrotliCompress);
    
    await pipeline(source, brotliCompress, destination);    
  } catch (err) {
    throw new Error(OPERATION_FAILED);
  }    
};