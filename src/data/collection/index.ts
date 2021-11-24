import {AnalyzedRecord} from '../record/types/types';
import {selectClose, selectDate, selectOpen, selectProfitPotential_mut, selectVolume} from '../record/selectors';
import {roundToPrecision} from '../../util/functions';
import {format} from 'date-fns';
import {DATE_FORMAT} from '../../constants';

/**
 * Given a collection of records, select the record with the biggest difference between "high" and "low"
 * @param collection
 */
export function selectDateWithLargestPriceDifference(collection: AnalyzedRecord[]) {
    const highLowDifferenceSorterDesc = ({highLowDifference: a}: AnalyzedRecord, {highLowDifference: b}: AnalyzedRecord) => b - a;
    const record                      = collection.sort(highLowDifferenceSorterDesc)[0];
    return format(selectDate(record), DATE_FORMAT);
}

/**
 * Given a collection of records, select the record with the biggest difference between "high" and "low"
 * @param collection
 */
export function selectRecordsWithMaximumProfitPotential(collection: AnalyzedRecord[]) {
    // !!!!note!!!!!
    // This is making the assumption that we can make the most money on days where the price increased during the day.
    // if the price of a stock starts high and ends low, the profit potential would be inverted

    const records_priceIncreasedDuringTheDay =
              collection.filter(d => (selectClose(d) - selectOpen(d)) > 0)

    const profitPotentialSorterDesc = ({profitPotential: a}: AnalyzedRecord, {profitPotential: b}: AnalyzedRecord) => b - a;
    const sorted                    = records_priceIncreasedDuringTheDay.sort(profitPotentialSorterDesc);
    const maxEarningPotential       = selectProfitPotential_mut(sorted[0]);
    return sorted.filter(record => selectProfitPotential_mut(record) === maxEarningPotential);
}


/**
 * Given a set of records, calculate the average volume
 *
 * @param collection
 */
export function calculateAverageVolume(collection: AnalyzedRecord[]) {
    const summer = (sum: number, record: AnalyzedRecord) => sum + (selectVolume(record) ?? 0);
    const sum    = collection.reduce(summer, 0);
    const count  = collection.length ?? 1;
    return roundToPrecision(sum / count);
}

