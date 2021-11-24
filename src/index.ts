import {parseData} from './data/util/parser/parser';
import {parseCachedData, readData, writeCachedData} from './data/util/reader/reader';
import {DATA_CACHE_PATH, DATA_PATH} from './constants/fs';
import {DATE_FORMAT, MONTHS} from './constants';
import {analyzeRecord} from './data/record/analysis';
import {calculateAverageVolume, selectDateWithLargestPriceDifference, selectRecordsWithMaximumProfitPotential} from './data/collection';
import {createAggregateFilter} from './data/util/filter';
import {getMonthFilter, getYearFilter} from './data/record/util';
import {AnalyzedRecord} from './data/record/types/types';
import {selectDate, selectProfitPotential_mut} from './data/record/selectors';
import {format} from 'date-fns';

/**
 * Get data from a data file or a json file
 */
async function getDataCollection() {
    let collection: AnalyzedRecord[];

    try {
        collection = await parseCachedData(DATA_CACHE_PATH);
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


    let recordsWithMaximumProfitPotential = selectRecordsWithMaximumProfitPotential(collection);
    return {
        'The day with the largest variance between high and low':
            selectDateWithLargestPriceDifference(collection),
        'The average volume for July 2012':
            calculateAverageVolume(records_July2012),
        'Records with the maximum earning potential':
        // !! note!! this comes with some major assumptions
            recordsWithMaximumProfitPotential.map(record => {
                const mpp  = selectProfitPotential_mut(record);
                const date = format(selectDate(record), DATE_FORMAT);
                return `A maximum earning potential of \n\t\t\$${mpp}\n\toccurred on \n\t\t${date}`
            }).join('\n\t---\n'),
    }
}


const logValues = (obj: any) => Object.entries(obj)
                                      .map(([key, values]) => {
                                          console.log(key);
                                          if (Array.isArray(values)) {
                                              values.map(value => console.log('\t', value))
                                          } else {
                                              console.log('\t', values)
                                          }
                                      });
answerQuestions().then(logValues);