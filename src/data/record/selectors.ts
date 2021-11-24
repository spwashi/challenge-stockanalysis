/**
 * Methods for selecting or computing properties
 */

import {AnalyzedRecord, Record} from './types/types';
import {calculateHighLowDifference, calculateProfitPotential} from './calculators';


export const selectDate   = (record: Record) => record.date;
export const selectVolume = (record: Record) => +record.volume;
export const selectOpen   = (record: Record) => +record.open;
export const selectClose  = (record: Record) => +record.close;
export const selectHigh   = (record: Record) => +record.high;
export const selectLow    = (record: Record) => +record.low;

// calculates and caches the difference between the day's high and low
export const selectHighLowDifference_mut = (d: Record & Partial<AnalyzedRecord>) => d.highLowDifference = d.highLowDifference ?? calculateHighLowDifference(d);
export const selectProfitPotential_mut   = (d: Record & Partial<AnalyzedRecord>) => d.profitPotential = d.profitPotential ?? calculateProfitPotential(d);
