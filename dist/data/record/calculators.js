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
    return functions_1.roundToPrecision(selectors_1.selectHigh(record) - selectors_1.selectLow(record));
};
exports.calculateHighLowDifference = calculateHighLowDifference;
/**
 * Calculate the potential earnings in a given day
 *
 * @todo verify this is the correct calculation
 *
 * @param record
 */
var calculateProfitPotential = function (record) {
    return selectors_1.selectHighLowDifference_mut(record) * selectors_1.selectVolume(record);
};
exports.calculateProfitPotential = calculateProfitPotential;
