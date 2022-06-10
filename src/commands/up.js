import { resolve } from 'path';

export const up = async (path) => {
    try {
        const upFolder = resolve(path, '..');
        return upFolder;
      } catch (err) {
        throw Error(OPERATION_FAILED);
      }
};

