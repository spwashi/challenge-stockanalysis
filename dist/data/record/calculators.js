"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateProfitPotential = exports.calculateHighLowDifference = void 0;
var functions_1 = require("../../util/functions");
var selectors_1 = require("./selectors");
/**
 * Calculate the difference between the day's High and Low values
 *
 * @param record
 */
var calculateHighLowDifference = function (record) {
    var high = selectors_1.selectHigh(record);
    var low = selectors_1.selectLow(record);
    if (isNaN(high) || isNaN(low))
        throw new Error('Improper input');
    return functions_1.roundToPrecision(high - low);
};
exports.calculateHighLowDifference = calculateHighLowDifference;
/**
 * Calculate the potential earnings in a given day.
 *
 * The potential earnings
 *
 * @todo verify this is the correct calculation
 *
 * @param record
 */
var calculateProfitPotential = function (record) {
    var volume = selectors_1.selectVolume(record);
    if (isNaN(volume))
        throw new Error('Improper input');
    var multiplier = (selectors_1.selectOpen(record) - selectors_1.selectClose(record)) > 0 ? -1 : 1;
    return selectors_1.selectHighLowDifference_mut(record) * volume * multiplier;
};
exports.calculateProfitPotential = calculateProfitPotential;
