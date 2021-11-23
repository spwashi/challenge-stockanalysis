import fs from 'fs';

export const readData = (filePath: string) => fs.promises.readFile(filePath, 'utf-8');