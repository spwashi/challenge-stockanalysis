export type Datum =
    {
        date: Date;
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
    }

export type AnalyzedDatum =
    Datum
    & {
        highLowDifference: number; profitPotential: number
    };
