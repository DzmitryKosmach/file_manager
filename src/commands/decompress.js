import { createBrotliDecompress } from "zlib";
import { resolve, dirname, basename } from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { BROTLI_EXTENTION, OPERATION_FAILED } from "../constants.js";

export const decompress = async (currentPath, filePath, PathTo) => {
  try {
    const fileFullPathFrom = resolve(currentPath, filePath);
    const dirnameFrom = dirname(fileFullPathFrom);
    const __basename = basename(fileFullPathFrom);
    const fileFullPathTo = resolve(dirnameFrom, PathTo, __basename);
    const compressBasename = basename(fileFullPathTo);
    const decompressDirname = dirname(fileFullPathTo);
    const decompressBasename = compressBasename.split(BROTLI_EXTENTION, 1)[0];
    const fileFullPathToBrotliDecompress = resolve(decompressDirname, decompressBasename);
    
    const brotliDecompress  = createBrotliDecompress();
    const source = createReadStream(fileFullPathFrom);
    const destination = createWriteStream(fileFullPathToBrotliDecompress);
    
    await pipeline(source, brotliDecompress, destination);    
  } catch (err) {
    throw new Error(OPERATION_FAILED);
  }    
};