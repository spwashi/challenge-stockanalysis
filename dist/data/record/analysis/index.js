"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeRecord = void 0;
var selectors_1 = require("../selectors");
/**
 * Performs analysis on a single record in isolation
 *
 * @param record
 */
var analyzeRecord = function (record) {
    selectors_1.selectProfitPotential_mut(record);
    return record;
};
exports.analyzeRecord = analyzeRecord;
