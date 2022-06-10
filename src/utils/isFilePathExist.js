import { access } from "fs/promises";

export async function isFilePathExist(filePath) {
  try {
    await access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}
