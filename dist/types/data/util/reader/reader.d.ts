import { AnalyzedRecord, Record } from '../../record/types/types';
/**
 * Opens a data file and returns its contents
 *
 * @param filePath
 */
export declare const readData: (filePath: string) => Promise<string>;
/**
 * Read data from a JSON file
 *
 * @param filePath
 */
export declare const parseCachedData: (filePath: string) => Promise<AnalyzedRecord[]>;
/**
 * Write data to a JSON file after having parsed it
 * @param filePath
 * @param obj
 */
export declare const writeCachedData: (filePath: string, obj: Record[]) => Promise<void>;
