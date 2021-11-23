import {readData} from '../reader';
import {DATA_PATH} from '../../constants/fs';
import {parseData} from '../parser';
import assert from 'assert';

describe('Data parser', function () {
    it('should be able to parse data', async function () {
        const data = await readData(DATA_PATH);
        const out  = parseData(data, {delimiter: '\t'});
        assert(out.length === (data.split('\n').length - 1), new Error('data was improperly parsed'));

        const first = out[0];
        assert(first.date?.constructor === Date);
        assert(typeof first.close === 'number');
        assert(typeof first.open === 'number');
        assert(typeof first.high === 'number');
        assert(typeof first.low === 'number');
        assert(typeof first.volume === 'number');
    });
});