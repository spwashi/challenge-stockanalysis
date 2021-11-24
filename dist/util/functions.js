"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDate = exports.toNumber = exports.passiveNoop = exports.roundToPrecision = void 0;
var date_fns_1 = require("date-fns");
var constants_1 = require("../constants");
var roundToPrecision = function (num, precision) {
    if (precision === void 0) { precision = 100; }
    return Math.round(precision * (num)) / precision;
};
exports.roundToPrecision = roundToPrecision;
var passiveNoop = function (n) { return n; };
exports.passiveNoop = passiveNoop;
var toNumber = function (n) { return +n; };
exports.toNumber = toNumber;
var toDate = function (n) { return date_fns_1.parse(n, constants_1.DATE_FORMAT, new Date); };
exports.toDate = toDate;
