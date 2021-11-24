"use strict";
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
var parser_1 = require("./data/util/parser/parser");
var reader_1 = require("./data/util/reader/reader");
var fs_1 = require("./constants/fs");
var constants_1 = require("./constants");
var analysis_1 = require("./data/record/analysis");
var collection_1 = require("./data/collection");
var filter_1 = require("./data/util/filter");
var util_1 = require("./data/record/util");
/**
 * Get data from a data file or a json file
 */
function getDataCollection() {
    return __awaiter(this, void 0, void 0, function () {
        var collection, e_1, parse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 5]);
                    return [4 /*yield*/, reader_1.readCachedData(fs_1.DATA_CACHE_PATH)];
                case 1:
                    collection = _a.sent();
                    return [3 /*break*/, 5];
                case 2:
                    e_1 = _a.sent();
                    parse = function (text) { return parser_1.parseData(text, analysis_1.analyzeRecord); };
                    return [4 /*yield*/, reader_1.readData(fs_1.DATA_PATH).then(parse)];
                case 3:
                    collection = _a.sent();
                    return [4 /*yield*/, reader_1.writeCachedData(fs_1.DATA_CACHE_PATH, collection)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, collection];
            }
        });
    });
}
/**
 * This is the main function, answers questions about the dataset
 */
function answerQuestions() {
    return __awaiter(this, void 0, void 0, function () {
        var collection, records_July2012;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDataCollection()];
                case 1:
                    collection = _a.sent();
                    records_July2012 = collection.filter(filter_1.createAggregateFilter([
                        util_1.getMonthFilter(constants_1.MONTHS.JUL),
                        util_1.getYearFilter(2012),
                    ]));
                    return [2 /*return*/, {
                            a: collection_1.selectDateWithLargestPriceDifference(collection),
                            b: collection_1.calculateAverageVolume(records_July2012),
                            c: collection_1.selectRecordWithMaximumProfitPotential(collection),
                        }];
            }
        });
    });
}
answerQuestions().then(console.log);
