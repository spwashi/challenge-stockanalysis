/**
 * Given the contents of a TSV file,
 *  return an array of objects representing the data
 * @param text
 * @param delimiter
 */
import {AnalyzedRecord, Record} from '../../record/types';
import {passiveNoop, toDate, toNumber} from '../../../util/functions';
import {RecordTransformer} from './types';

type ParsingOptions = {
    columnDelimiter?: string;
    rowDelimiter?: string;
}
function extractRowsAndColumns(text: string, parsingOptions: ParsingOptions): {
    rows: any[],
    columns: (keyof Record)[]
} {
    const mutateArrayToLowercase = (columns: string[]) => columns.forEach((v, k) => columns[k] = v.toLowerCase());
    const splitColumns           = (line: string) => line.split(parsingOptions.columnDelimiter ?? '\t');
    const splitRows              = (document: string) => document.split(parsingOptions.rowDelimiter ?? '\n')


    const rows    = splitRows(text).map(splitColumns);
    const columns = rows.shift();

    if (!columns) throw new Error('cannot parse: no columns provided');

    mutateArrayToLowercase(columns);

    return {
        rows,
        columns: columns as (keyof Record)[],
    };
}


/**
 * Given an array of columns and an array of data,
 *  create
 * @param columns
 * @param rowData
 */
function hydrateRecord(columns: (keyof Record)[], rowData: string[]): Record {
    const record       = {} as Partial<Record>;
    const indexColumn = (colName: keyof Record, index: number) => {
        switch (colName) {
            case 'date':
                return record[colName] = toDate(rowData[index]);
            default:
                return record[colName] = toNumber(rowData[index]);
        }
    };
    columns.forEach(indexColumn);
    return record as Record;
}

/**
 * Given a string of tabular data, return an array of Records mutated by the provided transformer
 *
 * {@see Record}
 *
 * @param text A string of tabular data
 * @param transform Function to run on each record
 * @param parsingOptions Options for parsing the data
 */
export const parseData =
                 (
                     text: string,
                     transform: RecordTransformer   = passiveNoop,
                     parsingOptions: ParsingOptions = {},
                 ): AnalyzedRecord[] => {
                     const {rows, columns} = extractRowsAndColumns(text, parsingOptions);
                     return rows.map(row => transform(hydrateRecord(columns, row)))
                                .filter(Boolean);
                 }