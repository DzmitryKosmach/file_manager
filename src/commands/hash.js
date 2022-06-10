import { createHash } from "crypto";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { OPERATION_FAILED } from "../constants.js";

const algorithm = "SHA256";
const encoding = "hex";

export const hash = async (currentPath, filePath) => {
    try {
        const filePathForHash = resolve(currentPath, filePath);

        const fileBuffer = await readFile(filePathForHash);
        const hashSum = createHash(algorithm);
        hashSum.update(fileBuffer);
        const hex = hashSum.digest(encoding);
        console.log(`The hash of file: ${filePathForHash}:\n` + hex);
        
        } catch (error) {
            throw Error(OPERATION_FAILED);
        }
};