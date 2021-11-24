import { Record } from './types';
/**
 * Calculate the difference between the day's High and Low values
 *
 * @param record
 */
export declare const calculateHighLowDifference: (record: Record) => number;
/**
 * Calculate the potential earnings in a given day
 *
 * @todo verify this is the correct calculation
 *
 * @param record
 */
export declare const calculateProfitPotential: (record: Record) => number;
