"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var calculators_1 = require("../calculators");
describe('High Low Difference Calculator', function () {
    it('should not work if the high or low value is missing', function () {
        expect(function () { return calculators_1.calculateHighLowDifference({ high: 2 }); }).toThrowError();
        expect(function () { return calculators_1.calculateHighLowDifference({ low: 2 }); }).toThrowError();
    });
    var createMockRecord = function (high, low) {
        if (high === void 0) { high = 7; }
        if (low === void 0) { low = 3; }
        return ({ high: high, low: low });
    };
    it('should take a record and return the difference between its high and low values with a precision to 2 decimal places', function () {
        assert_1.default(calculators_1.calculateHighLowDifference(createMockRecord()) === 4);
    });
});
describe('Maximum Profit Potential Calculator', function () {
    var createMockRecord = function (open, close, volume) {
        if (open === void 0) { open = 2; }
        if (close === void 0) { close = 5; }
        if (volume === void 0) { volume = 100; }
        return ({ high: 7, low: 3, volume: volume, open: open, close: close });
    };
    it('should calculate the maximum potential profit', function () {
        var MPP;
        MPP = calculators_1.calculateProfitPotential(createMockRecord(2, 5));
        assert_1.default(MPP === 400);
        MPP = calculators_1.calculateProfitPotential(createMockRecord(5, 2));
        assert_1.default(MPP === -400);
    });
});
