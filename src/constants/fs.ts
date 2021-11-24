import * as path from 'path';

export const DATA_PATH = process.env.DATA_PATH ?? '';
path.resolve(__dirname, '../../_data/data.dat');
export const DATA_CACHE_PATH = process.env.DATA_CACHE_PATH ?? path.join(__dirname, '../../_data/data.json');
console.log({DATA_PATH, DATA_CACHE_PATH})
