"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("./data/parser");
var reader_1 = require("./data/reader");
var fs_1 = require("./constants/fs");
var constants_1 = require("./constants");
var selectVolume = function (datum) { return datum.volume; };
var roundToPrecision = function (num, precision) {
    if (precision === void 0) { precision = 100; }
    return Math.round(precision * (num)) / precision;
};
var selectHighLowDifference = function (d) { return roundToPrecision(d.high - d.low); };
function getMonthFilter(month) {
    return function (datum) { var _a; return ((_a = datum.date) === null || _a === void 0 ? void 0 : _a.getMonth()) === month; };
}
function getYearFilter(year) {
    return function (datum) { var _a; return ((_a = datum.date) === null || _a === void 0 ? void 0 : _a.getFullYear()) === year; };
}
function calculateAverageVolume(data, filters) {
    var _a;
    if (filters === void 0) { filters = []; }
    var filter = function (d) { return filters.reduce(function (isTruthy, filter) { return isTruthy ? filter(d) : false; }, true); };
    var dataPointsInRange = data.filter(filter);
    var addVolumesReducer = function (sum, datum) { var _a; return sum + ((_a = selectVolume(datum)) !== null && _a !== void 0 ? _a : 0); };
    var sumFromJuly2012 = dataPointsInRange.reduce(addVolumesReducer, 0);
    var count = (_a = dataPointsInRange.length) !== null && _a !== void 0 ? _a : 1;
    return roundToPrecision(sumFromJuly2012 / count);
}
function analyzeData(data) {
    return data.map(function (datum) {
        var highLowDifference = selectHighLowDifference(datum);
        var profitPotential = highLowDifference * selectVolume(datum);
        return __assign(__assign({}, datum), { highLowDifference: highLowDifference,
            profitPotential: profitPotential });
    });
}
function getDateWithBiggestHighLowDifference(processedData) {
    return processedData.sort(function (_a, _b) {
        var a = _a.highLowDifference;
        var b = _b.highLowDifference;
        return b - a;
    })[0];
}
function answerQuestions() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, reader_1.readData(fs_1.DATA_PATH).then(parser_1.parseData).then(analyzeData)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, {
                            a: getDateWithBiggestHighLowDifference(data),
                            b: calculateAverageVolume(data, [
                                getMonthFilter(constants_1.MONTHS.JUL),
                                getYearFilter(2012),
                            ]),
                            c: '',
                        }];
            }
        });
    });
}
answerQuestions().then(console.log);
