import {Record} from './types';
import {roundToPrecision} from '../../util/functions';
import {selectHigh, selectHighLowDifference_mut, selectLow, selectVolume} from './selectors';

/**
 * Calculate the difference between the day's High and Low values
 *
 * @param record
 */
export const calculateHighLowDifference = (record: Record) => {
    return roundToPrecision(selectHigh(record) - selectLow(record));
};

/**
 * Calculate the potential earnings in a given day
 *
 * @todo verify this is the correct calculation
 *
 * @param record
 */
export const calculateProfitPotential = (record: Record) => {
    return selectHighLowDifference_mut(record) * selectVolume(record)
}
