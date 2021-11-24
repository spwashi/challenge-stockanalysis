import { AnalyzedRecord, Record } from '../../record/types';
/**
 * Opens a data file and returns its contents
 *
 * @param filePath
 */
export declare const readData: (filePath: string) => Promise<string>;
export declare const readCachedData: (filePath: string) => Promise<AnalyzedRecord[]>;
export declare const writeCachedData: (filePath: string, obj: Record[]) => Promise<void>;
