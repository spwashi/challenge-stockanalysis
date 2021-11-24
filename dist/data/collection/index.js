"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAverageVolume = exports.selectRecordsWithMaximumProfitPotential = exports.selectDateWithLargestPriceDifference = void 0;
var selectors_1 = require("../record/selectors");
var functions_1 = require("../../util/functions");
var date_fns_1 = require("date-fns");
var constants_1 = require("../../constants");
/**
 * Given a collection of records, select the record with the biggest difference between "high" and "low"
 * @param collection
 */
function selectDateWithLargestPriceDifference(collection) {
    var highLowDifferenceSorterDesc = function (_a, _b) {
        var a = _a.highLowDifference;
        var b = _b.highLowDifference;
        return b - a;
    };
    var record = collection.sort(highLowDifferenceSorterDesc)[0];
    return date_fns_1.format(selectors_1.selectDate(record), constants_1.DATE_FORMAT);
}
exports.selectDateWithLargestPriceDifference = selectDateWithLargestPriceDifference;
/**
 * Given a collection of records, select the record with the biggest difference between "high" and "low"
 * @param collection
 */
function selectRecordsWithMaximumProfitPotential(collection) {
    // !!!!note!!!!!
    // This is making the assumption that we can make the most money on days where the price increased during the day.
    // if the price of a stock starts high and ends low, the profit potential would be inverted
    var records_priceIncreasedDuringTheDay = collection.filter(function (d) { return (selectors_1.selectClose(d) - selectors_1.selectOpen(d)) > 0; });
    var profitPotentialSorterDesc = function (_a, _b) {
        var a = _a.profitPotential;
        var b = _b.profitPotential;
        return b - a;
    };
    var sorted = records_priceIncreasedDuringTheDay.sort(profitPotentialSorterDesc);
    var maxEarningPotential = selectors_1.selectProfitPotential_mut(sorted[0]);
    return sorted.filter(function (record) { return selectors_1.selectProfitPotential_mut(record) === maxEarningPotential; });
}
exports.selectRecordsWithMaximumProfitPotential = selectRecordsWithMaximumProfitPotential;
/**
 * Given a set of records, calculate the average volume
 *
 * @param collection
 */
function calculateAverageVolume(collection) {
    var _a;
    var summer = function (sum, record) { var _a; return sum + ((_a = selectors_1.selectVolume(record)) !== null && _a !== void 0 ? _a : 0); };
    var sum = collection.reduce(summer, 0);
    var count = (_a = collection.length) !== null && _a !== void 0 ? _a : 1;
    return functions_1.roundToPrecision(sum / count);
}
exports.calculateAverageVolume = calculateAverageVolume;
