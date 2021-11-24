"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYearFilter = exports.getMonthFilter = void 0;
var selectors_1 = require("./selectors");
function getMonthFilter(month) {
    return function (record) {
        return selectors_1.selectDate(record).getMonth() === month;
    };
}
exports.getMonthFilter = getMonthFilter;
function getYearFilter(year) {
    return function (record) { return selectors_1.selectDate(record).getFullYear() === year; };
}
exports.getYearFilter = getYearFilter;
