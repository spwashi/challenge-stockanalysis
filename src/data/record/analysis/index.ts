import {Record} from '../types';
import {selectProfitPotential_mut} from '../selectors';

/**
 * Performs analysis on a single record in isolation
 *
 * @param record
 */
export const analyzeRecord =
                 (record: Record) => {
                     selectProfitPotential_mut(record);
                     return record;
                 };