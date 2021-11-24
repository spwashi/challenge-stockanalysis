import { AnalyzedRecord } from '../record/types/types';
/**
 * Given a collection of records, select the record with the biggest difference between "high" and "low"
 * @param collection
 */
export declare function selectDateWithLargestPriceDifference(collection: AnalyzedRecord[]): string;
/**
 * Given a collection of records, select the record with the biggest difference between "high" and "low"
 * @param collection
 */
export declare function selectRecordsWithMaximumProfitPotential(collection: AnalyzedRecord[]): AnalyzedRecord[];
/**
 * Given a set of records, calculate the average volume
 *
 * @param collection
 */
export declare function calculateAverageVolume(collection: AnalyzedRecord[]): number;
