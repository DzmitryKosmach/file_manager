import { createReadStream } from "fs";
import { access } from "fs/promises";
import { resolve } from "path";
import readline from "readline";
//import { pipeline } from "stream/promises";
import { OPERATION_FAILED } from "../constants.js";

export const cat = async (currentPath, pathFile) => {
  try {
    const pathFileToRead = resolve(currentPath, pathFile);

    await access(pathFileToRead);

    //pipeline(createReadStream(pathFileToRead), process.stdout);

    const file = readline.createInterface({
      input: createReadStream(pathFileToRead),
      output: process.stdout,
      terminal: false,
    });    

    file.on("line", (line) => {
      console.log(line);
    });
  } catch (error) {
    throw Error(OPERATION_FAILED);
  }
};
