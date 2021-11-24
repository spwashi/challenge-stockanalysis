import {readData} from '../../reader/reader';
import {DATA_PATH} from '../../../../constants/fs';
import {parseData} from '../parser';
import assert from 'assert';
import {selectClose, selectDate, selectHigh, selectLow, selectOpen, selectVolume} from '../../../record/selectors';

describe('Data parser', function () {
    it('should be able to parse data', async function () {
        const data = await readData(DATA_PATH);
        const out  = parseData(data);
        assert(out.length === (data.split('\n').length - 1), new Error('data was improperly parsed'));

        const first = out[0];
        assert(selectDate(first)?.constructor === Date);
        assert(typeof selectClose(first) === 'number');
        assert(typeof selectOpen(first) === 'number');
        assert(typeof selectHigh(first) === 'number');
        assert(typeof selectLow(first) === 'number');
        assert(typeof selectVolume(first) === 'number');
    });
});