/**
 * Represents one day of financial data
 */
export declare type Record = {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
};
/**
 * Type representing a data point we've already performed calculations on
 */
export declare type AnalyzedRecord = Record & {
    highLowDifference: number;
    profitPotential: number;
};
