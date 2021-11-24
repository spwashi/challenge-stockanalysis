import {parseData} from './data/util/parser/parser';
import {readCachedData, readData, writeCachedData} from './data/util/reader/reader';
import {DATA_CACHE_PATH, DATA_PATH} from './constants/fs';
import {MONTHS} from './constants';
import {analyzeRecord} from './data/record/analysis';
import {calculateAverageVolume, selectDateWithLargestPriceDifference, selectRecordWithMaximumProfitPotential} from './data/collection';
import {createAggregateFilter} from './data/util/filter';
import {getMonthFilter, getYearFilter} from './data/record/util';
import {AnalyzedRecord} from './data/record/types';

/**
 * Get data from a data file or a json file
 */
async function getDataCollection() {
    let collection: AnalyzedRecord[];

    try {
        collection = await readCachedData(DATA_CACHE_PATH);
    } catch (e) {
        const parse = (text: string) => parseData(text, analyzeRecord);
        collection  = await readData(DATA_PATH).then(parse);
        await writeCachedData(DATA_CACHE_PATH, collection);
    }
    return collection;
}
/**
 * This is the main function, answers questions about the dataset
 */
async function answerQuestions() {
    const collection =
              await getDataCollection();

    const records_July2012 =
              collection.filter(createAggregateFilter([
                                                          getMonthFilter(MONTHS.JUL),
                                                          getYearFilter(2012),
                                                      ]));


    return {
        a: selectDateWithLargestPriceDifference(collection),
        b: calculateAverageVolume(records_July2012),
        c: selectRecordWithMaximumProfitPotential(collection),
    }
}


answerQuestions().then(console.log);