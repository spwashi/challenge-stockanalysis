import {AnalyzedRecord} from '../record/types';
import {selectClose, selectOpen, selectVolume} from '../record/selectors';
import {roundToPrecision} from '../../util/functions';

/**
 * Given a collection of records, select the record with the biggest difference between "high" and "low"
 * @param collection
 */
export function selectDateWithLargestPriceDifference(collection: AnalyzedRecord[]) {
    let highLowDifferenceSorterDesc = ({highLowDifference: a}: AnalyzedRecord, {highLowDifference: b}: AnalyzedRecord) => b - a;
    return collection.sort(highLowDifferenceSorterDesc)[0];
}

/**
 * Given a collection of records, select the record with the biggest difference between "high" and "low"
 * @param collection
 */
export function selectRecordWithMaximumProfitPotential(collection: AnalyzedRecord[]) {
    // note!!
    // This is making the assumption that we can make the most money on days where the price increased during the day.
    // if the price of a stock starts high and ends low, the profit potential would be inverted

    const records_priceIncreasedDuringTheDay =
              collection.filter(d => (selectClose(d) - selectOpen(d)) > 0)

    const profitPotentialSorterDesc = ({profitPotential: a}: AnalyzedRecord, {profitPotential: b}: AnalyzedRecord) => b - a;
    return records_priceIncreasedDuringTheDay.sort(profitPotentialSorterDesc)[0];
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

