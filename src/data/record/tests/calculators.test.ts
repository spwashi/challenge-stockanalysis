import assert from 'assert';
import {calculateHighLowDifference, calculateProfitPotential} from '../calculators';
import {Record} from '../types/types';


describe('High Low Difference Calculator', function () {
    it('should not work if the high or low value is missing', () => {
        expect(() => calculateHighLowDifference({high: 2} as Record)).toThrowError();
        expect(() => calculateHighLowDifference({low: 2} as Record)).toThrowError();
    });

    const createMockRecord = (high = 7, low = 3) => ({high, low} as Record);
    it('should take a record and return the difference between its high and low values with a precision to 2 decimal places', () => {
        assert(calculateHighLowDifference(createMockRecord()) === 4);
    })
});

describe('Maximum Profit Potential Calculator', function () {
    const createMockRecord = (open = 2, close = 5, volume = 100) => ({high: 7, low: 3, volume, open, close} as Record);
    it('should calculate the maximum potential profit', () => {
        let MPP: number;
        MPP = calculateProfitPotential(createMockRecord(2, 5))
        assert(MPP === 400);
        MPP = calculateProfitPotential(createMockRecord(5, 2));
        assert(MPP === -400);
    })
});