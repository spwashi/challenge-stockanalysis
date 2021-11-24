import {Record} from './types/types';
import {roundToPrecision} from '../../util/functions';
import {selectClose, selectHigh, selectHighLowDifference_mut, selectLow, selectOpen, selectVolume} from './selectors';

/**
 * Calculate the difference between the day's High and Low values
 *
 * @param record
 */
export const calculateHighLowDifference = (record: Record) => {
    const high = selectHigh(record);
    const low  = selectLow(record);
    if (isNaN(high) || isNaN(low)) throw new Error('Improper input')
    return roundToPrecision(high - low);
};

/**
 * Calculate the potential earnings in a given day.
 *
 * The potential earnings
 *
 * @todo verify this is the correct calculation
 *
 * @param record
 */
export const calculateProfitPotential = (record: Record) => {
    const volume = selectVolume(record);
    if (isNaN(volume)) throw new Error('Improper input');
    const multiplier = (selectOpen(record) - selectClose(record)) > 0 ? -1 : 1;
    return selectHighLowDifference_mut(record) * volume * multiplier;
}
