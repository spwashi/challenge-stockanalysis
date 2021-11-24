/**
 * Given the contents of a TSV file,
 *  return an array of objects representing the data
 * @param text
 * @param delimiter
 */
import { AnalyzedRecord } from '../../record/types/types';
import { RecordTransformer } from './types';
declare type ParsingOptions = {
    columnDelimiter?: string;
    rowDelimiter?: string;
};
/**
 * Given a string of tabular data, return an array of Records mutated by the provided transformer
 *
 * {@see Record}
 *
 * @param text A string of tabular data
 * @param transform Function to run on each record
 * @param parsingOptions Options for parsing the data
 */
export declare const parseData: (text: string, transform?: RecordTransformer, parsingOptions?: ParsingOptions) => AnalyzedRecord[];
export {};
