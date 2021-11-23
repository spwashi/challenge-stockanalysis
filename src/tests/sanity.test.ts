import * as fs from 'fs';
import {DATA_PATH} from '../constants/fs';

describe('What I am doing', function () {
    it('should run', function () {
        console.log('everything is okay')
    });
    it('should be able to open a text file', function () {
        return fs.promises.readFile(DATA_PATH, 'utf-8')
                 .then(console.log);
    });
});