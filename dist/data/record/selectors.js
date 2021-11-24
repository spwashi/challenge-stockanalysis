"use strict";
/**
 * Methods for selecting or computing properties
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectProfitPotential_mut = exports.selectHighLowDifference_mut = exports.selectLow = exports.selectHigh = exports.selectClose = exports.selectOpen = exports.selectVolume = exports.selectDate = void 0;
var calculators_1 = require("./calculators");
var selectDate = function (record) { return record.date; };
exports.selectDate = selectDate;
var selectVolume = function (record) { return +record.volume; };
exports.selectVolume = selectVolume;
var selectOpen = function (record) { return +record.open; };
exports.selectOpen = selectOpen;
var selectClose = function (record) { return +record.close; };
exports.selectClose = selectClose;
var selectHigh = function (record) { return +record.high; };
exports.selectHigh = selectHigh;
var selectLow = function (record) { return +record.low; };
exports.selectLow = selectLow;
// calculates and caches the difference between the day's high and low
var selectHighLowDifference_mut = function (d) { var _a; return d.highLowDifference = (_a = d.highLowDifference) !== null && _a !== void 0 ? _a : calculators_1.calculateHighLowDifference(d); };
exports.selectHighLowDifference_mut = selectHighLowDifference_mut;
var selectProfitPotential_mut = function (d) { var _a; return d.profitPotential = (_a = d.profitPotential) !== null && _a !== void 0 ? _a : calculators_1.calculateProfitPotential(d); };
exports.selectProfitPotential_mut = selectProfitPotential_mut;
