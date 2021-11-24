/**
 * Methods for selecting or computing properties
 */
import { AnalyzedRecord, Record } from './types';
export declare const selectDate: (record: Record) => Date;
export declare const selectVolume: (record: Record) => number;
export declare const selectOpen: (record: Record) => number;
export declare const selectClose: (record: Record) => number;
export declare const selectHigh: (record: Record) => number;
export declare const selectLow: (record: Record) => number;
export declare const selectHighLowDifference_mut: (d: Record & Partial<AnalyzedRecord>) => number;
export declare const selectProfitPotential_mut: (d: Record & Partial<AnalyzedRecord>) => number;
