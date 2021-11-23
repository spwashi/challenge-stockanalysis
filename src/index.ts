import {parseData} from './data/parser';
import {readData} from './data/reader';
import {DATA_PATH} from './constants/fs';
import {AnalyzedDatum, Datum} from './data/types/types';
import {MONTHS} from './constants';


const selectVolume            = (datum: Datum) => datum.volume;
const roundToPrecision        = (num: number, precision = 100) => Math.round(precision * (num)) / precision;
const selectHighLowDifference = (d: Datum) => roundToPrecision(d.high - d.low);


function getMonthFilter(month: number) {
    return (datum: Datum) => datum.date?.getMonth() === month;
}
function getYearFilter(year: number) {
    return (datum: Datum) => datum.date?.getFullYear() === year;
}
function calculateAverageVolume(data: AnalyzedDatum[], filters: ((d: Datum) => boolean)[] = []) {
    const filter            = (d: AnalyzedDatum) => filters.reduce((isTruthy, filter) => isTruthy ? filter(d) : false, true);
    const dataPointsInRange = data.filter(filter);
    const addVolumesReducer = (sum: number, datum: AnalyzedDatum) => sum + (selectVolume(datum) ?? 0);
    const sumFromJuly2012   = dataPointsInRange.reduce(addVolumesReducer, 0);
    const count             = dataPointsInRange.length ?? 1;
    return roundToPrecision(sumFromJuly2012 / count);
}

function analyzeData(data: Datum[]): AnalyzedDatum[] {
    return data.map(datum => {
        const highLowDifference = selectHighLowDifference(datum);
        const profitPotential   = highLowDifference * selectVolume(datum);
        return {
            ...datum,
            highLowDifference,
            profitPotential,
        };
    });
}
function getDateWithBiggestHighLowDifference(processedData: AnalyzedDatum[]) {
    return processedData.sort(({highLowDifference: a}, {highLowDifference: b}) => b - a)[0];
}
async function answerQuestions() {
    const data = await readData(DATA_PATH).then(parseData).then(analyzeData);

    return {
        a: getDateWithBiggestHighLowDifference(data),
        b: calculateAverageVolume(data,
                                  [
                                      getMonthFilter(MONTHS.JUL),
                                      getYearFilter(2012),
                                  ]),
        c: '',
    }
}


answerQuestions().then(console.log);